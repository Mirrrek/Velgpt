import OpenAI from 'openai';
import env from '@env';
import { MessageContentText } from 'openai/resources/beta/threads/messages/messages';

class Thread {
    private openai: OpenAI;
    private threadID: string;
    private assistantID: string;

    constructor(openai: OpenAI, threadID: string, assistantID: string) {
        this.openai = openai;
        this.threadID = threadID;
        this.assistantID = assistantID;
    }

    async addMessage(message: string): Promise<void> {
        await this.openai.beta.threads.messages.create(this.threadID, { role: 'user', content: message })
    }

    async getResponse(): Promise<{ role: 'user' | 'assistant', created: number, content: string }[]> {
        const run = await this.openai.beta.threads.runs.create(this.threadID, { assistant_id: this.assistantID });

        await new Promise<void>((resolve) => {
            const retrieveStatus = async () => {
                const state = await this.openai.beta.threads.runs.retrieve(this.threadID, run.id);

                if (state.status === 'completed') {
                    resolve();
                    return;
                }

                if (state.status === 'requires_action') {
                    switch (state.required_action?.type) {
                        case 'submit_tool_outputs': {
                            await this.openai.beta.threads.runs.submitToolOutputs(this.threadID, run.id, {
                                tool_outputs: await Promise.all(state.required_action.submit_tool_outputs.tool_calls.map((call) => this.callTool(call)))
                            });
                        } break;
                        default:
                            throw new Error('Unknown required action');
                    }
                }

                if (state.status === 'cancelled') {
                    throw new Error('GPT run was cancelled');
                }

                if (state.status === 'expired') {
                    throw new Error('GPT run expired');
                }

                if (state.status === 'failed') {
                    throw new Error('GPT run failed');
                }

                setTimeout(retrieveStatus, 1000);
            }

            retrieveStatus();
        });

        return (await this.openai.beta.threads.messages.list(this.threadID)).data.map((message) => {
            return {
                role: message.role,
                created: message.created_at,
                content: message.content.filter((c) => c.type === 'text').map((c) => (c as MessageContentText).text.value).join('')
            }
        });
    }

    private async callTool(call: { id: string, type: string, [key: string]: any }): Promise<{ tool_call_id: string, output: string }> {
        switch (call.type) {
            case 'function': {
                let args = {};
                try {
                    args = JSON.parse(call.function.arguments);
                } catch (e) {
                    return {
                        tool_call_id: call.id,
                        output: `Error: Invalid JSON in arguments "${call.function.arguments}"`
                    }
                }
                return {
                    tool_call_id: call.id,
                    output: JSON.stringify(await this.callFunction(call.function.name, args))
                }
            } break;
            default: {
                return {
                    tool_call_id: call.id,
                    output: `Error: Unknown tool type "${call.type}"`
                }
            }
        }
    }

    private async callFunction(functionName: string, args: any): Promise<any> {
        switch (functionName) {
            case 'fetch_wikipedia': {
                if (typeof args.id !== 'number' || args.id < 0) {
                    return {
                        error: `Invalid page ID "${args.id}"`
                    };
                }

                args.language = args.language ?? 'en';

                if (!['cs', 'en'].includes(args.language)) {
                    return {
                        error: `Invalid language "${args.language}"`
                    };
                }

                return await fetch(`https://${args.language}.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&pageids=${args.id}&redirects&format=json`)
                    .then((res) => res.json())
                    .then((data) => {
                        const page = Object.values(data.query.pages)[0] as any;

                        if (page.missing !== undefined) {
                            return {
                                error: `Invalid page ID "${args.id}"`
                            }
                        }

                        return {
                            pageID: page.pageid,
                            title: page.title ?? null,
                            wikitext: page.revisions[0]?.slots?.main?.['*'] ?? null
                        }
                    }).catch((e) => {
                        return {
                            error: 'Unexpected error occurred'
                        };
                    });
            } break;
            case 'search_wikipedia': {
                if (typeof args.query !== 'string') {
                    return {
                        error: `Invalid query "${args.query}"`
                    };
                }

                args.language = args.language ?? 'en';

                if (!['cs', 'en'].includes(args.language)) {
                    return {
                        error: `Invalid language "${args.language}"`
                    };
                }

                return await fetch(`https://${args.language}.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&generator=search&gsrsearch=${args.query}&gsrnamespace=0&format=json`)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.query === undefined) {
                            return {
                                error: 'No results found'
                            }
                        }

                        return Object.values(data.query.pages).map((page: any) => ({
                            pageID: page.pageid,
                            title: page.title ?? null,
                            extract: page.extract ?? null
                        }));
                    }).catch((e) => {
                        return {
                            error: 'Unexpected error occurred'
                        };
                    });
            } break;
            default: {
                return {
                    error: `Unknown function "${functionName}"`
                };
            } break;
        }
    }
}

export default class GPT {
    private openai;
    private assistantID: string;

    constructor(assistantID: string) {
        this.openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });
        this.assistantID = assistantID;
    }

    async createThread(): Promise<Thread> {
        return new Thread(this.openai, (await this.openai.beta.threads.create()).id, this.assistantID);
    }
}

import * as React from 'react';
import * as packets from '@shared/packets';
import MainView from '@components/views/MainView';
import ListEntry from '@components/elements/ListEntry';
import TextContainer from '@components/elements/TextContainer';
import Clickable from '@components/elements/Clickable';
import TinyText from '@components/elements/TinyText';
import SmallText from '@components/elements/SmallText';
import MediumText from '@components/elements/MediumText';
import InputField from '@components/elements/InputField';

export type ThreadDetailLayoutProps = {
    thread: packets.Thread;
    onBack: () => void;
    onSend: (message: string) => void;
    onAnswer: () => void;
}

export default class ThreadDetailLayout extends React.Component<ThreadDetailLayoutProps> {
    render(): React.ReactNode {
        return <MainView title={<TextContainer spaced><TextContainer><Clickable icon='arrow_back_ios' onClick={this.props.onBack} />{this.props.thread.question !== null && <MediumText>Question <MediumText bold>{this.props.thread.question}&nbsp;</MediumText></MediumText>}Thread</TextContainer><Clickable icon='task' onClick={this.props.onAnswer} /></TextContainer>}>
            {this.props.thread.messages.map((message, i) => {
                switch (message.type) {
                    case 'user':
                        return <ListEntry key={i} indicator>
                            <SmallText bold>{message.user}</SmallText>
                            <TinyText>{message.content}</TinyText>
                        </ListEntry>
                    case 'gpt':
                        return <ListEntry key={i} indicator>
                            <SmallText bold>GPT</SmallText>
                            <TinyText>{message.content}</TinyText>
                        </ListEntry>
                    case 'system':
                        switch (message.event) {
                            case 'searching':
                                return <ListEntry key={i} indicator onClick={() => { window.open(message.link, '_blank') }}>
                                    <TinyText gray>Searching {<TinyText bold>{message.content}</TinyText>} on Wikipedia</TinyText>
                                </ListEntry>
                            case 'fetching':
                                return <ListEntry key={i} indicator onClick={() => { window.open(message.link, '_blank') }}>
                                    <TinyText gray>Fetching Wikipedia article {<TinyText bold>{message.content}</TinyText>}</TinyText>
                                </ListEntry>
                        }
                }
            })}
            <InputField placeholder="Type a message..." active={this.props.thread.state === 'ready'} onSend={this.props.onSend} />
        </MainView>
    }
}

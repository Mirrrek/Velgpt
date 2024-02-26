export type Configuration = {
    id: string;
    name: string;
    assistant: string;
    groups: Group[];
    terms: TermCategory[];
    questionSuggestions: QuestionSuggestion[];
    answerSuggestions: AnswerSuggestionCategory[];
}[];

type Group = {
    id: string;
    name: string;
}

type TermCategory = {
    id: string;
    terms: string[];
}

type QuestionSuggestion = {
    chunks: QuestionChunk[];
}

type QuestionChunk = {
    type: 'text';
    text: string;
} | {
    type: 'term';
    category: string;
} | {
    type: 'input';
}

type AnswerSuggestionCategory = string[];

const configuration: Configuration = [{
    id: 'ch',
    name: 'Ch',
    assistant: 'Velgpt - Ch',
    groups: [{
        id: 'a',
        name: 'A',
    }, {
        id: 'b',
        name: 'B',
    }],
    terms: [{
        id: 'prvek',
        terms: ['vodík', 'kyslík', 'uhlík', 'dusík', 'síra']
    }, {
        id: 'sloučenina',
        terms: ['voda', 'oxid uhličitý']
    }],
    questionSuggestions: [{
        chunks: [{
            type: 'text',
            text: 'Patří '
        }, {
            type: 'term',
            category: 'prvek'
        }, {
            type: 'text',
            text: ' mezi prvky přechodné či nepřechodné?'
        }]
    }, {
        chunks: [{
            type: 'text',
            text: 'Kolikavazný je '
        }, {
            type: 'term',
            category: 'prvek'
        }, {
            type: 'text',
            text: '?'
        }]
    }, {
        chunks: [{
            type: 'text',
            text: 'Patří '
        }, {
            type: 'term',
            category: 'prvek'
        }, {
            type: 'text',
            text: ' mezi '
        }, {
            type: 'term',
            category: 'sloučenina'
        }, {
            type: 'text',
            text: '?'
        }]
    }],
    answerSuggestions: [
        ['A', 'B', 'C', 'D'],
        ['Ano', 'Ne']
    ]
}, {
    id: 'bi',
    name: 'Bi',
    assistant: 'Velgpt - Bi',
    groups: [{
        id: 'a',
        name: 'A',
    }, {
        id: 'b',
        name: 'B',
    }],
    terms: [{
        id: 'řád/čeleď/idk',
        terms: []
    }, {
        id: 'zástupce',
        terms: []
    }, {
        id: 'část těla',
        terms: ['hlava', 'tělo', 'noha', 'končetina']
    }],
    questionSuggestions: [{
        chunks: [{
            type: 'text',
            text: 'Patří '
        }, {
            type: 'term',
            category: 'zástupce'
        }, {
            type: 'text',
            text: ' mezi '
        }, {
            type: 'term',
            category: 'řád/čeleď/idk'
        }, {
            type: 'text',
            text: '?'
        }]
    }],
    answerSuggestions: [
        ['A', 'B', 'C', 'D'],
        ['Ano', 'Ne']
    ]
}];

export default configuration;

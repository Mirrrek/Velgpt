import * as React from 'react';
import configuration from '@shared/configuration';
import MainView from '@components/views/MainView';
import ListEntry from '@components/elements/ListEntry';
import TextContainer from '@components/elements/TextContainer';
import Clickable from '@components/elements/Clickable';
import CategoryIcon from '@components/elements/CategoryIcon';
import InputField from '@components/elements/InputField';

export type ThreadAnswerLayoutProps = {
    selectedSubject: string;
    onBack: () => void;
    onSelect: (answer: string) => void;
}

export default class ThreadAnswerLayout extends React.Component<ThreadAnswerLayoutProps> {
    render(): React.ReactNode {
        return <MainView title={<TextContainer><Clickable icon='arrow_back_ios' onClick={this.props.onBack} />Select Answer</TextContainer>}>
            {configuration.find((subject) => subject.id === this.props.selectedSubject)?.answerSuggestions.map((answerSuggestionCategory, i) => <ListEntry key={i}>
                <TextContainer spaced>
                    {answerSuggestionCategory.map((answerSuggestion, j) =>
                        <Clickable key={j} onClick={() => { this.props.onSelect(answerSuggestion); }}>
                            <CategoryIcon>{answerSuggestion}</CategoryIcon>
                        </Clickable>
                    )}
                </TextContainer>
            </ListEntry>)}
            <InputField placeholder='Type your answer' icon='done_all' onSend={this.props.onSelect} />
        </MainView>
    }
}

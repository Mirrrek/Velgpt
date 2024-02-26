import * as React from 'react';
import * as packets from '@shared/packets';
import configuration from '@shared/configuration';
import normalizeText from '@shared/normalizeText';
import MainView from '@components/views/MainView';
import ListEntry from '@components/elements/ListEntry';
import SmallText from '@components/elements/SmallText';
import MediumText from '@components/elements/MediumText';
import CategoryIcon from '@components/elements/CategoryIcon';
import TextContainer from '@components/elements/TextContainer';

export type ThreadOverviewLayoutProps = {
    selectedSubject: string;
    selectedGroup: string;
    threadList: packets.Thread[];
    onNewThread: () => void;
    onThreadSelect: (thread: packets.Thread) => void;
}

export default class ThreadOverviewLayout extends React.Component<ThreadOverviewLayoutProps> {
    render(): React.ReactNode {
        return <MainView title={<MediumText>Group <MediumText bold>{configuration.find((subject) => subject.id === this.props.selectedSubject)?.groups.find((group) => group.id === this.props.selectedGroup)?.name}</MediumText> Answers</MediumText>} button={{ icon: 'add', onClick: this.props.onNewThread }}>
            {this.props.threadList.sort((a, b) => (a.question && b.question) ? a.question.localeCompare(b.question) : (a.question ? -1 : (b.question ? 1 : 0))).map((thread, i) => <ListEntry key={thread.id} indicator onClick={() => { this.props.onThreadSelect(thread); }}>
                <TextContainer>
                    <CategoryIcon>{thread.question ?? '-'}</CategoryIcon>
                    {thread.answer !== null ? <SmallText>{normalizeText(thread.answer, 50)}</SmallText> : <SmallText gray>No answer selected</SmallText>}
                </TextContainer>
            </ListEntry>)}
        </MainView>
    }
}

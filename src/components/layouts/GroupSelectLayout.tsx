import * as React from 'react';
import configuration from '@shared/configuration';
import MainView from '@components/views/MainView';
import ListEntry from '@components/elements/ListEntry';
import LargeText from '@components/elements/LargeText';

export type GroupSelectLayoutProps = {
    selectedSubject: string;
    onSelect: (id: string) => void;
}

export default class GroupSelectLayout extends React.Component<GroupSelectLayoutProps> {
    render(): React.ReactNode {
        return <MainView>
            {configuration.find((subject) => subject.id === this.props.selectedSubject)?.groups.map((group) => <ListEntry key={group.id} stretch onClick={() => { this.props.onSelect(group.id) }}>
                <LargeText centered>{group.name}</LargeText>
            </ListEntry>)}
        </MainView>
    }
}

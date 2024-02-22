import * as React from 'react';
import configuration from '@shared/configuration';
import MainView from '@components/views/MainView';
import ListEntry from '@components/elements/ListEntry';
import LargeText from '@components/elements/LargeText';

export type SubjectSelectLayoutProps = {
    onSelect: (id: string) => void;
}

export default class SubjectSelectLayout extends React.Component<SubjectSelectLayoutProps> {
    render(): React.ReactNode {
        return <MainView>
            {configuration.map((subject) => <ListEntry key={subject.id} stretch onClick={() => { this.props.onSelect(subject.id) }}>
                <LargeText centered>{subject.name}</LargeText>
            </ListEntry>)}
        </MainView>
    }
}

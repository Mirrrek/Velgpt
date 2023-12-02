import * as React from 'react';
import { Configuration } from '@shared/configuration';
import MainView from '@components/views/MainView';
import ListEntry from '@components/elements/ListEntry';
import LargeText from '@components/elements/LargeText';

export type SubjectSelectLayoutProps = {
    configuration: Configuration;
    onSelect: (id: string) => void;
}

export default class SubjectSelectLayout extends React.Component<SubjectSelectLayoutProps> {
    render(): React.ReactNode {
        return <MainView>
            {this.props.configuration.map((subject) => <ListEntry key={subject.id} onClick={() => { this.props.onSelect(subject.id) }}>
                <LargeText centered>{subject.name}</LargeText>
            </ListEntry>)}
        </MainView>
    }
}

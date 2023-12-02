import * as React from 'react';
import MainView from '@components/views/MainView';
import ListEntry from '@components/elements/ListEntry';
import LargeText from '@components/elements/LargeText';
import MediumText from '@components/elements/MediumText';

export type ErrorLayoutProps = {
    message?: string;
}

export default class ErrorLayout extends React.Component<ErrorLayoutProps> {
    render(): React.ReactNode {
        return <MainView>
            <ListEntry centered>
                <LargeText centered>An error occurred</LargeText>
                <MediumText centered>{this.props.message ?? 'Unexpected error'}</MediumText>
            </ListEntry>
        </MainView>
    }
}

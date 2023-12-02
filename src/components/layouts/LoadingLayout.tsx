import * as React from 'react';
import MainView from '@components/views/MainView';
import ListEntry from '@components/elements/ListEntry';
import Loading from '@components/elements/Loading';

export type LoadingLayoutProps = {}

export default class LoadingLayout extends React.Component<LoadingLayoutProps> {
    render(): React.ReactNode {
        return <MainView>
            <ListEntry centered>
                <Loading />
            </ListEntry>
        </MainView>
    }
}

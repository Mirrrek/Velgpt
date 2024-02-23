import * as React from 'react';
import MainView from '@components/views/MainView';

export type ThreadDetailLayoutProps = {
}

export default class ThreadDetailLayout extends React.Component<ThreadDetailLayoutProps> {
    render(): React.ReactNode {
        return <MainView title='Answer'>
        </MainView>
    }
}

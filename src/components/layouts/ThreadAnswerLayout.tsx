import * as React from 'react';
import MainView from '@components/views/MainView';

export type ThreadAnswerLayoutProps = {
}

export default class ThreadAnswerLayout extends React.Component<ThreadAnswerLayoutProps> {
    render(): React.ReactNode {
        return <MainView title='Set answer'>
        </MainView>
    }
}

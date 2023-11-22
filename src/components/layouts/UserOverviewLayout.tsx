import * as React from 'react';
import MainView from '@components/views/MainView';

export type UserOverviewLayoutProps = {
}

export default class UserOverviewLayout extends React.Component<UserOverviewLayoutProps> {
    render(): React.ReactNode {
        return <MainView title='Users'>
        </MainView>
    }
}

import * as React from 'react';
import MainView from '@components/views/MainView';

export type SignInLayoutProps = {
}

export default class SignInLayout extends React.Component<SignInLayoutProps> {
    render(): React.ReactNode {
        return <MainView title='Sign In'>
        </MainView>
    }
}

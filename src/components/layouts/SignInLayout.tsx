import * as React from 'react';
import env from '@env';
import MainView from '@components/views/MainView';
import ListEntry from '@components/elements/ListEntry';
import ErrorLayout from '@components/layouts/ErrorLayout';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';

export type SignInLayoutProps = {
    onSignIn: (credentialResponse: CredentialResponse) => void;
}

export type SignInLayoutState = {
    error: boolean;
}

export default class SignInLayout extends React.Component<SignInLayoutProps, SignInLayoutState> {
    constructor(props: SignInLayoutProps) {
        super(props);
        this.state = {
            error: false
        }
    }

    render(): React.ReactNode {
        if (this.state.error) {
            return <ErrorLayout message='Failed to sign in' />
        }

        return <MainView>
            <ListEntry centered>
                <GoogleOAuthProvider clientId={env.GOOGLE_CLIENT_ID}>
                    <GoogleLogin shape='pill' text='continue_with' onSuccess={this.props.onSignIn} onError={() => { this.setState({ error: true }) }} />
                </GoogleOAuthProvider>
            </ListEntry>
        </MainView>
    }
}

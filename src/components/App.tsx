import * as React from 'react';
import * as packets from '@shared/packets';
import log from '@shared/log';
import configuration from '@shared/configuration';
import SubjectSelectLayout from '@components/layouts/SubjectSelectLayout';
import SignInLayout from '@components/layouts/SignInLayout';
import UserOverviewLayout from '@components/layouts/UserOverviewLayout';
import GroupSelectLayout from '@components/layouts/GroupSelectLayout';
import AnswerOverviewLayout from '@components/layouts/AnswerOverviewLayout';
import QuestionPickLayout from '@components/layouts/QuestionPickLayout';
import QuestionSubmitLayout from '@components/layouts/QuestionSubmitLayout';
import LoadingLayout from '@components/layouts/LoadingLayout';

enum Layout {
    LOADING,
    SUBJECT_SELECT,
    SIGN_IN,
    USER_OVERVIEW,
    GROUP_SELECT,
    ANSWER_OVERVIEW,
    QUESTION_PICK,
    QUESTION_SUBMIT
}

type AppState = {
    layout: Layout;
    selectedSubject: string | null;
    userList: packets.User[];
    threadList: packets.Thread[];
}

export default class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            layout: Layout.SUBJECT_SELECT,
            selectedSubject: null,
            userList: [],
            threadList: []
        }
    }

    componentDidMount(): void {
        window.addEventListener('hashchange', () => {
            if (window.location.hash !== '') {
                return;
            }
            if (this.state.layout > Layout.ANSWER_OVERVIEW) {
                this.setLayout(Layout.ANSWER_OVERVIEW);
            } else if (this.state.layout !== Layout.SUBJECT_SELECT) {
                window.location.reload();
            }
        });
    }

    setLayout(layout: Layout): void {
        window.location.hash = '#back-block';
        this.setState({ layout });
    }

    render(): React.ReactNode {
        switch (this.state.layout) {
            case Layout.LOADING:
                return <LoadingLayout />
            case Layout.SUBJECT_SELECT:
                return <SubjectSelectLayout configuration={configuration} onSelect={(id) => { this.setState({ selectedSubject: id }); this.setLayout(Layout.SIGN_IN); }} />
            case Layout.SIGN_IN:
                return <SignInLayout onSignIn={(credentialResponse) => {
                    if (window.connection === undefined) {
                        this.setLayout(Layout.SIGN_IN);
                        return;
                    }
                    log('INFO', 'Authenticating to server');
                    window.connection.send<packets.AuthenticatePacket>(packets.PacketType.SB_AUTHENTICATE, {
                        subject: this.state.selectedSubject!,
                        token: credentialResponse.credential as string
                    });
                    window.connection.await<packets.AuthenticatedPacket>(packets.PacketType.CB_AUTHENTICATED).then((packet) => {
                        log('INFO', 'Authentication successful');
                        this.setLayout(Layout.USER_OVERVIEW);

                        window.connection?.on<packets.UpdateUserListPacket>(packets.PacketType.CB_UPDATE_USER_LIST, (packet) => {
                            log('INFO', `Received user list update: ${packet.users.map((user) => `"${user.name}"`).join(', ') || '-'}`);
                            this.setState({ userList: packet.users });
                        });
                    });
                    this.setLayout(Layout.LOADING);
                }} />
            case Layout.USER_OVERVIEW:
                return <UserOverviewLayout configuration={configuration} selectedSubject={this.state.selectedSubject as string} userList={this.state.userList} onContinue={() => { this.setLayout(Layout.GROUP_SELECT); }} />
            case Layout.GROUP_SELECT:
                return <GroupSelectLayout configuration={configuration} selectedSubject={this.state.selectedSubject as string} onSelect={(id) => {
                    if (window.connection === undefined) {
                        this.setLayout(Layout.GROUP_SELECT);
                        return;
                    }
                    log('INFO', `Selecting group "${id}"`);
                    window.connection.send<packets.RegisterGroupPacket>(packets.PacketType.SB_REGISTER_GROUP, {
                        group: id
                    });
                    window.connection?.on<packets.UpdateThreadListPacket>(packets.PacketType.CB_UPDATE_THREAD_LIST, (packet) => {
                        log('INFO', 'Received answer list update');
                        this.setState({ threadList: packet.threads });
                    });
                    this.setLayout(Layout.ANSWER_OVERVIEW);
                }} />
            case Layout.ANSWER_OVERVIEW:
                return <AnswerOverviewLayout />
            case Layout.QUESTION_PICK:
                return <QuestionPickLayout />
            case Layout.QUESTION_SUBMIT:
                return <QuestionSubmitLayout />
        }
    }
}

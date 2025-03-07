import * as React from 'react';
import * as packets from '@shared/packets';
import log from '@shared/log';
import SubjectSelectLayout from '@components/layouts/SubjectSelectLayout';
import SignInLayout from '@components/layouts/SignInLayout';
import UserOverviewLayout from '@components/layouts/UserOverviewLayout';
import GroupSelectLayout from '@components/layouts/GroupSelectLayout';
import ThreadOverviewLayout from '@components/layouts/ThreadOverviewLayout';
import ThreadDetailLayout from '@components/layouts/ThreadDetailLayout';
import ThreadAnswerLayout from '@components/layouts/ThreadAnswerLayout';
import QuestionPickLayout from '@components/layouts/QuestionPickLayout';
import QuestionSubmitLayout from '@components/layouts/QuestionSubmitLayout';
import LoadingLayout from '@components/layouts/LoadingLayout';

enum Layout {
    LOADING,
    SUBJECT_SELECT,
    SIGN_IN,
    USER_OVERVIEW,
    GROUP_SELECT,
    THREAD_OVERVIEW,
    THREAD_DETAIL,
    THREAD_ANSWER,
    QUESTION_PICK,
    QUESTION_SUBMIT
}

type AppState = {
    layout: Layout;
    selectedSubject: string | null;
    selectedGroup: string | null;
    selectedThread: number | null;
    userList: packets.User[];
    threadList: packets.Thread[];
}

export default class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            layout: Layout.SUBJECT_SELECT,
            selectedSubject: null,
            selectedGroup: null,
            selectedThread: null,
            userList: [],
            threadList: []
        }
    }

    componentDidMount(): void {
        window.addEventListener('hashchange', () => {
            if (window.location.hash !== '') {
                return;
            }
            if (this.state.layout > Layout.THREAD_OVERVIEW) {
                switch (this.state.layout) {
                    case Layout.THREAD_ANSWER:
                        this.setLayout(Layout.THREAD_DETAIL);
                        break;
                    case Layout.QUESTION_SUBMIT:
                        this.setLayout(Layout.QUESTION_PICK);
                        break;
                    default:
                        this.setLayout(Layout.THREAD_OVERVIEW);
                        break;
                }
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
                return <SubjectSelectLayout onSelect={(id) => { this.setState({ selectedSubject: id }); this.setLayout(Layout.SIGN_IN); }} />
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
                return <UserOverviewLayout selectedSubject={this.state.selectedSubject as string} userList={this.state.userList} onContinue={() => { this.setLayout(Layout.GROUP_SELECT); }} />
            case Layout.GROUP_SELECT:
                return <GroupSelectLayout selectedSubject={this.state.selectedSubject as string} onSelect={(id) => {
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
                    this.setState({ selectedGroup: id });
                    this.setLayout(Layout.THREAD_OVERVIEW);
                }} />
            case Layout.THREAD_OVERVIEW:
                return <ThreadOverviewLayout selectedSubject={this.state.selectedSubject as string} selectedGroup={this.state.selectedGroup as string} threadList={this.state.threadList} onNewThread={() => { this.setLayout(Layout.QUESTION_PICK); }} onThreadSelect={(thread) => {
                    this.setState({ selectedThread: thread.id });
                    this.setLayout(Layout.THREAD_DETAIL);
                }} />
            case Layout.THREAD_DETAIL:
                return <ThreadDetailLayout thread={this.state.threadList.find((thread) => thread.id === this.state.selectedThread)!} onBack={() => { this.setLayout(Layout.THREAD_OVERVIEW); }} onSend={(message) => {
                    if (window.connection === undefined) {
                        this.setLayout(Layout.GROUP_SELECT);
                        return;
                    }
                    log('INFO', `Sending message "${message}"`);
                    window.connection.send<packets.WriteMessagePacket>(packets.PacketType.SB_WRITE_MESSAGE, {
                        id: this.state.selectedThread!,
                        message
                    });
                }} onAnswer={() => { this.setLayout(Layout.THREAD_ANSWER); }} />
            case Layout.THREAD_ANSWER:
                return <ThreadAnswerLayout selectedSubject={this.state.selectedSubject as string} onBack={() => { this.setLayout(Layout.THREAD_DETAIL); }} onSelect={(answer) => {
                    if (window.connection === undefined) {
                        this.setLayout(Layout.GROUP_SELECT);
                        return;
                    }
                    log('INFO', `Selecting answer "${answer}"`);
                    window.connection.send<packets.AnswerThreadPacket>(packets.PacketType.SB_ANSWER_THREAD, {
                        id: this.state.selectedThread!,
                        answer
                    });
                    this.setLayout(Layout.THREAD_OVERVIEW);
                }} />
            case Layout.QUESTION_PICK:
                return <QuestionPickLayout />
            case Layout.QUESTION_SUBMIT:
                return <QuestionSubmitLayout />
        }
    }
}

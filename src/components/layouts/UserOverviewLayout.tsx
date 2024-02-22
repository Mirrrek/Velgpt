import * as React from 'react';
import * as packets from '@shared/packets';
import configuration from '@shared/configuration';
import MainView from '@components/views/MainView';
import ListEntry from '@components/elements/ListEntry';
import SmallText from '@components/elements/SmallText';
import TextContainer from '@components/elements/TextContainer';

export type UserOverviewLayoutProps = {
    selectedSubject: string;
    userList: packets.User[];
    onContinue: () => void;
}

export default class UserOverviewLayout extends React.Component<UserOverviewLayoutProps> {
    render(): React.ReactNode {
        return <MainView title='Users' button={{ onClick: this.props.onContinue, icon: 'chevron_right' }}>
            {this.props.userList.map((user, i) => <ListEntry key={user.name} indicator>
                <TextContainer>
                    <SmallText>{user.name}</SmallText>
                    {user.group && <SmallText gray>&nbsp;&middot;&nbsp;{configuration.find((subject) => subject.id === this.props.selectedSubject)?.groups.find((group) => group.id === user.group)?.name}</SmallText>}
                </TextContainer>
            </ListEntry>)}
        </MainView>
    }
}

import * as React from 'react';
import configuration, { Configuration } from '@shared/configuration';
import MainView from '@components/views/MainView';
import ListEntry from '@components/elements/ListEntry';
import SmallText from '@components/elements/SmallText';

export type UserOverviewLayoutProps = {
    configuration: Configuration;
    selectedSubject: string;
    userList: { name: string, group: string | null }[];
    onContinue: () => void;
}

export default class UserOverviewLayout extends React.Component<UserOverviewLayoutProps> {
    render(): React.ReactNode {
        return <MainView title='Users' button={{ onClick: this.props.onContinue, icon: 'arrow_circle_right' }}>
            {this.props.userList.map((user, i) => <ListEntry key={user.name} indicator>
                <SmallText detail={user.group !== null ? configuration.find((subject) => subject.id === this.props.selectedSubject)?.groups.find((group) => group.id === user.group)?.name : undefined}>{user.name}</SmallText>
            </ListEntry>)}
        </MainView>
    }
}

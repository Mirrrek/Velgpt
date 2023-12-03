import * as React from 'react';
import MainView from '@components/views/MainView';
import ListEntry from '@components/elements/ListEntry';
import SmallText from '@components/elements/SmallText';

export type UserOverviewLayoutProps = {
    userList: { name: string, group: string | null }[];
    onContinue: () => void;
}

export default class UserOverviewLayout extends React.Component<UserOverviewLayoutProps> {
    render(): React.ReactNode {
        return <MainView title='Users' button={{ onClick: this.props.onContinue, icon: 'arrow_circle_right' }}>
            {this.props.userList.map((user, i) => <ListEntry key={user.name}>
                <SmallText detail={user.group !== null ? user.group : undefined}>{user.name}</SmallText>
            </ListEntry>)}
        </MainView>
    }
}

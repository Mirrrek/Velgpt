import * as React from 'react';
import MainView from '@components/views/MainView';

export type AnswerOverviewLayoutProps = {
}

export default class AnswerOverviewLayout extends React.Component<AnswerOverviewLayoutProps> {
    render(): React.ReactNode {
        return <MainView title='Answers'>
        </MainView>
    }
}

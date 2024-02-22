import * as React from 'react';
import MainView from '@components/views/MainView';

export type AnswerDetailLayoutProps = {
}

export default class AnswerDetailLayout extends React.Component<AnswerDetailLayoutProps> {
    render(): React.ReactNode {
        return <MainView title='Answer'>
        </MainView>
    }
}

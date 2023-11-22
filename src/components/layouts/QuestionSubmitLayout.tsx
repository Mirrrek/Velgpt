import * as React from 'react';
import MainView from '@components/views/MainView';

export type QuestionSubmitLayoutProps = {
}

export default class QuestionSubmitLayout extends React.Component<QuestionSubmitLayoutProps> {
    render(): React.ReactNode {
        return <MainView title='Answers'>
        </MainView>
    }
}

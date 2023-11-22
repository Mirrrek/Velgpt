import * as React from 'react';
import SubjectSelectLayout from '@components/layouts/SubjectSelectLayout';
import SignInLayout from '@components/layouts/SignInLayout';
import UserOverviewLayout from '@components/layouts/UserOverviewLayout';
import GroupSelectLayout from '@components/layouts/GroupSelectLayout';
import AnswerOverviewLayout from '@components/layouts/AnswerOverviewLayout';
import QuestionPickLayout from '@components/layouts/QuestionPickLayout';
import QuestionSubmitLayout from '@components/layouts/QuestionSubmitLayout';

enum Layout {
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
}

export default class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            layout: Layout.SUBJECT_SELECT
        }
    }

    setLayout(layout: Layout): void {
        if (layout > Layout.ANSWER_OVERVIEW) {
            window.location.hash = '#';
        }
        this.setState({ layout });
    }

    render(): React.ReactNode {
        switch (this.state.layout) {
            case Layout.SUBJECT_SELECT:
                return <SubjectSelectLayout />
            case Layout.SIGN_IN:
                return <SignInLayout />
            case Layout.USER_OVERVIEW:
                return <UserOverviewLayout />
            case Layout.GROUP_SELECT:
                return <GroupSelectLayout />
            case Layout.ANSWER_OVERVIEW:
                return <AnswerOverviewLayout />
            case Layout.QUESTION_PICK:
                return <QuestionPickLayout />
            case Layout.QUESTION_SUBMIT:
                return <QuestionSubmitLayout />
        }
    }
}

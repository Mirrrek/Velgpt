import * as React from 'react';
import styles from '@components/elements/TextContainer.module.css';

export type TextContainerProps = {
    children?: React.ReactNode;
    spaced?: boolean;
}

export default class TextContainer extends React.Component<TextContainerProps> {
    render(): React.ReactNode {
        return <div className={styles.textContainer + (this.props.spaced ? ' ' + styles.spaced : '')}>{this.props.children}</div>
    }
}

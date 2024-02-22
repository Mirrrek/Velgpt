import * as React from 'react';
import styles from '@components/elements/TextContainer.module.css';

export type TextContainerProps = {
    children?: React.ReactNode;
}

export default class TextContainer extends React.Component<TextContainerProps> {
    render(): React.ReactNode {
        return <div className={styles.textContainer}>{this.props.children}</div>
    }
}

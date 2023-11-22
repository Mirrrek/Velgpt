import * as React from 'react';
import styles from '@components/elements/MediumText.module.css';

export type MediumTextProps = {
    children?: React.ReactNode;
    bold?: boolean;
    centered?: boolean;
}

export default class MediumText extends React.Component<MediumTextProps> {
    render(): React.ReactNode {
        return <p className={styles.mediumText + (this.props.bold ? ' ' + styles.bold : '') + (this.props.centered ? ' ' + styles.centered : '')}>{this.props.children}</p>
    }
}

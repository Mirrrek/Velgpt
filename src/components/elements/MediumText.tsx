import * as React from 'react';
import styles from '@components/elements/MediumText.module.css';

export type MediumTextProps = {
    children?: React.ReactNode;
    bold?: boolean;
    gray?: boolean;
    centered?: boolean;
}

export default class MediumText extends React.Component<MediumTextProps> {
    render(): React.ReactNode {
        return <span className={styles.mediumText + (this.props.bold ? ' ' + styles.bold : '') + (this.props.gray ? ' ' + styles.gray : '') + (this.props.centered ? ' ' + styles.centered : '')}>{this.props.children}</span>
    }
}

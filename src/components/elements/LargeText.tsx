import * as React from 'react';
import styles from '@components/elements/LargeText.module.css';

export type LargeTextProps = {
    children?: React.ReactNode;
    detail?: string;
    bold?: boolean;
    centered?: boolean;
}

export default class LargeText extends React.Component<LargeTextProps> {
    render(): React.ReactNode {
        return <p className={styles.largeText + (this.props.bold ? ' ' + styles.bold : '') + (this.props.centered ? ' ' + styles.centered : '')}>{this.props.children}{this.props.detail ? <span className={styles.detail}> &middot; {this.props.detail}</span> : ''}</p>
    }
}

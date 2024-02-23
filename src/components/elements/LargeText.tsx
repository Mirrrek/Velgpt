import * as React from 'react';
import styles from '@components/elements/LargeText.module.css';

export type LargeTextProps = {
    children?: React.ReactNode;
    bold?: boolean;
    gray?: boolean;
    centered?: boolean;
}

export default class LargeText extends React.Component<LargeTextProps> {
    render(): React.ReactNode {
        return <span className={styles.largeText + (this.props.bold ? ' ' + styles.bold : '') + (this.props.gray ? ' ' + styles.gray : '') + (this.props.centered ? ' ' + styles.centered : '')}>{this.props.children}</span>
    }
}

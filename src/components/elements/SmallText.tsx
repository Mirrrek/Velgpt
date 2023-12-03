import * as React from 'react';
import styles from '@components/elements/SmallText.module.css';

export type SmallTextProps = {
    children?: React.ReactNode;
    detail?: string;
    bold?: boolean;
    centered?: boolean;
}

export default class SmallText extends React.Component<SmallTextProps> {
    render(): React.ReactNode {
        return <p className={styles.smallText + (this.props.bold ? ' ' + styles.bold : '') + (this.props.centered ? ' ' + styles.centered : '')}>{this.props.children}{this.props.detail ? <span className={styles.detail}> &middot; {this.props.detail}</span> : ''}</p>
    }
}

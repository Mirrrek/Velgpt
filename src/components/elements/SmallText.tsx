import * as React from 'react';
import styles from '@components/elements/SmallText.module.css';

export type SmallTextProps = {
    children?: React.ReactNode;
    bold?: boolean;
    gray?: boolean;
    centered?: boolean;
}

export default class SmallText extends React.Component<SmallTextProps> {
    render(): React.ReactNode {
        return <span className={styles.smallText + (this.props.bold ? ' ' + styles.bold : '') + (this.props.gray ? ' ' + styles.gray : '') + (this.props.centered ? ' ' + styles.centered : '')}>{this.props.children}</span>
    }
}

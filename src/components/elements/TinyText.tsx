import * as React from 'react';
import styles from '@components/elements/TinyText.module.css';

export type TinyTextProps = {
    children?: React.ReactNode;
    bold?: boolean;
    gray?: boolean;
    centered?: boolean;
}

export default class TinyText extends React.Component<TinyTextProps> {
    render(): React.ReactNode {
        return <span className={styles.tinyText + (this.props.bold ? ' ' + styles.bold : '') + (this.props.gray ? ' ' + styles.gray : '') + (this.props.centered ? ' ' + styles.centered : '')}>{this.props.children}</span>
    }
}

import * as React from 'react';
import styles from '@components/elements/ListEntry.module.css';

export type ListEntryProps = {
    children?: React.ReactNode;
    onClick?: () => void;
    centered?: boolean;
    stretch?: boolean;
}

export default class ListEntry extends React.Component<ListEntryProps> {
    render(): React.ReactNode {
        return <div className={styles.listEntry + (this.props.onClick ? ' ' + styles.clickable : '') + (this.props.centered ? ' ' + styles.centered : '') + (this.props.stretch ? ' ' + styles.stretch : '')} onClick={this.props.onClick}>{this.props.children}</div>
    }
}

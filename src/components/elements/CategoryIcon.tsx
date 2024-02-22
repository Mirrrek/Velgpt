import * as React from 'react';
import styles from '@components/elements/CategoryIcon.module.css';

export type CategoryIconProps = {
    children?: React.ReactNode;
}

export default class CategoryIcon extends React.Component<CategoryIconProps> {
    render(): React.ReactNode {
        return <p className={styles.categoryIcon}>{this.props.children}</p>
    }
}

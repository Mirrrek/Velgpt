import * as React from 'react';
import styles from '@components/elements/Loading.module.css';

export type LoadingProps = {}

export default class Loading extends React.Component<LoadingProps> {
    render(): React.ReactNode {
        return <div className={styles.loading} />
    }
}

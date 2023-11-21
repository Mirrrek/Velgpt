import * as React from 'react';
import styles from '@components/App.module.css';

export default class App extends React.Component {
    render() {
        return <p className={styles.someClass}>Hello, world!</p>;
    }
}

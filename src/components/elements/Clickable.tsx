import * as React from 'react';
import styles from '@components/elements/Clickable.module.css';
import MediumText from '@components/elements/MediumText';

export type ClickableProps = {
    children?: React.ReactNode;
    icon?: string;
    onClick: () => void;
}

export default class Clickable extends React.Component<ClickableProps> {
    render(): React.ReactNode {
        return <div className={styles.clickable} onClick={this.props.onClick}>
            <MediumText>{this.props.icon && <span className='material-symbols-outlined' style={{ fontSize: '2rem', margin: 0 }}>{this.props.icon}</span>}{this.props.children}</MediumText>
        </div>
    }
}

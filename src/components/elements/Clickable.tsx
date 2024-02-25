import * as React from 'react';
import styles from '@components/elements/Clickable.module.css';
import MediumText from '@components/elements/MediumText';

type IconButton = {
    icon: string;
    onClick: () => void;
}

type TextButton = {
    text: string;
    onClick: () => void;
}

export type ClickableProps = {
    children?: React.ReactNode;
    button: IconButton | TextButton;
}

function isIconButton(button: IconButton | TextButton): button is IconButton {
    return (button as IconButton).icon !== undefined;
}

export default class Clickable extends React.Component<ClickableProps> {
    render(): React.ReactNode {
        return <div className={styles.clickable} onClick={this.props.button.onClick}>
            <MediumText>{isIconButton(this.props.button) ? <span className='material-symbols-outlined' style={{ fontSize: '2rem', margin: 0 }}>{this.props.button.icon}</span> : this.props.button.text}</MediumText>
        </div>
    }
}

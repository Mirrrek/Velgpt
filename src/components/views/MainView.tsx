import * as React from 'react';
import MediumText from '@components/elements/MediumText';
import styles from '@components/views/MainView.module.css';

type IconButton = {
    icon: string;
    onClick: () => void;
}

type TextButton = {
    text: string;
    onClick: () => void;
}

export type MainViewProps = {
    children?: React.ReactNode;
    title?: React.ReactNode;
    button?: IconButton | TextButton;
}

function isIconButton(button: IconButton | TextButton): button is IconButton {
    return (button as IconButton).icon !== undefined;
}

export default class MainView extends React.Component<MainViewProps> {
    render(): React.ReactNode {
        return <div className={styles.mainView}>
            {this.props.title && <div className={styles.title}>
                {typeof this.props.title === 'string' ? <MediumText>{this.props.title}</MediumText> : this.props.title}
            </div>}
            {this.props.children}
            {this.props.button && <div className={styles.button + (!isIconButton(this.props.button) ? ' ' + styles.padded : '')} onClick={this.props.button.onClick}>
                <MediumText>{isIconButton(this.props.button) ? <span className='material-symbols-outlined'>{this.props.button.icon}</span> : this.props.button.text}</MediumText>
            </div>}
        </div>
    }
}

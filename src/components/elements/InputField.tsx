import * as React from 'react';
import styles from '@components/elements/InputField.module.css';

export type InputFieldProps = {
    placeholder: string;
    active: boolean;
    onSend: (message: string) => void;
}

type InputFieldState = {
    message: string;
}

export default class InputField extends React.Component<InputFieldProps, InputFieldState> {
    constructor(props: InputFieldProps) {
        super(props);
        this.state = { message: '' };
    }

    render(): React.ReactNode {
        return <div className={styles.inputField}>
            <textarea className={styles.textarea} placeholder={this.props.placeholder} value={this.state.message} onChange={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
                this.setState({ message: e.target.value });
            }} />
            <button className={styles.button + ((!this.props.active || this.state.message.trim() === '') ? ' ' + styles.disabled : '')} onClick={() => {
                if (this.props.active && this.state.message.trim() !== '') {
                    this.props.onSend(this.state.message.trim());
                    this.setState({ message: '' });
                }
            }}><span className='material-symbols-outlined' style={{ margin: 0 }}>send</span></button>
        </div>
    }
}

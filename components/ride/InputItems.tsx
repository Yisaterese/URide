import React from 'react';
import { HeaderInputProps } from "../../types/types";
import styles from '../../styles/styles.module.css';

const InputTag: React.FC<HeaderInputProps> = ({  icon,
                                                  value,
                                                  onChange,
                                                  onInput,
                                                  onBlur,
                                                  placeholder,
                                                  className}) => {
    return (
        <div className={styles.inputTag}>
            {icon}
            <input
                type="text"
                value={value}
                onChange={onChange}
                onInput={onInput}
                onBlur={onBlur}
                placeholder={placeholder}
                className={`${className} placeholder:text-black`}
            />

        </div>
    );
}

export default InputTag;

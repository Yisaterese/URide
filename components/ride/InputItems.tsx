import React from 'react';
import { HeaderInputProps } from "../../types/types";

const InputTag: React.FC<HeaderInputProps> = ({  icon,
                                                  value,
                                                  onChange,
                                                  onInput,
                                                  onBlur,
                                                  placeholder,
                                                  className}) => {
    return (
        <div className={'flex py-2 my-2 gap-2  bg-gray-300 rounded px-2 '}>
            {icon}
            <input type="text" value={value} onChange={onChange} onInput={onInput} onBlur={onBlur}
                   placeholder={placeholder} className={className}/>
        </div>
    );
}

export default InputTag;

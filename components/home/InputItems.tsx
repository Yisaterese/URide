import React from 'react';
import { HeaderInputProps } from "../../types/types";

const InputTag: React.FC<HeaderInputProps> = ({ text, icon,className,onChange }) => {
    return (
        <div className={'flex py-2 my-2 gap-2  bg-gray-300 rounded px-2 '}>
            {icon}
            <input type={'inputText'} placeholder={text} className={className}/>
        </div>
    );
}

export default InputTag;

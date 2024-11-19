import React from 'react';
import {ButtonProps} from "../../types/types";
const Button:React.FC<ButtonProps>=({text,className,onClick})=>{
    return(
        <div>
            <button className={className} onClick={onClick}>{text}</button>
        </div>
    );
}
export default Button;
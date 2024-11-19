import {ReactNode} from "react";
import L from 'leaflet';


export type HeaderInputProps ={
    icon?:ReactNode;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    placeholder?: string;
    className?: string;
}

export type ButtonProps = {
    text:string;
    className?:string
    onClick?: () => void;
}

type MapContextType = {
    map: L.Map | null;
};

type Suggestion = {
    display_name: string;
    lat: string;
    lon: string;
};
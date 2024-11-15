import {ReactNode} from "react";
import L from 'leaflet';


export type HeaderInputProps ={
    text:string;
    icon?:ReactNode;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
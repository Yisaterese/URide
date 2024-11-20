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

//
// export const PickupIcon = L.icon({
//     iconUrl: 'public/home/pickup.png',
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
// });

// export const DropOffIcon =L.icon({
//     iconUrl: 'public/home/dropOff.png',
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
// });
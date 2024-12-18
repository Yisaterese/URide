import {ReactNode} from "react";
import { StaticImageData } from 'next/image';


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


export type RideDetailsProps = {
    image: string | StaticImageData;
    title:string;
    icon:string;l ;
    numberOfPersons: number;
    time:string;
    text: string;
    price:number | string;
    classname?:string;
    onClick: (data: RideDetailsProps) => void;

}

export type RideDetailsModalProps = {
    closeModal: () => void;
    baseFare:number | string;
    minimumFare: number | string;
    perMinuteFare: number | string;
    perKilometerFare: number | string;
    EstimatedSurCharges: number | string;
}

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


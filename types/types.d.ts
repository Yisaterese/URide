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

export type DistanceResponse = {
    origin_location: string;
    destination_location: string;
    distance_in_miles: string;
    distance_in_kilometers: string;
    distance_in_nautical_miles: string;
    travel_time: string;
    origin_latitude: string;
    origin_longitude: string;
    destination_latitude: string;
    destination_longitude: string;
};


export type FareResponse = {
    journey: {
        arrival: string;
        city_name: string;
        department: string;
        distance: number;
        duration: number;
        fares: Array<{
            estimated: boolean;
            name: string;
            price_in_cents: number | string; // Adjusted to allow both number and string
        }>;
    };
    headers: {
        api: string;
        response_id: string;
        response_time: number;
        response_timestamp: string;
    };
};

export type RideDetailsProps = {
    image: string | StaticImageData;
    title:string;
    icon:string ;
    numberOfPersons: number;
    time:string;
    text: string;
    price:number | string;
    classname?:string;
    onClick?: (data: any) => void;
    isActiveBorder? :boolean;
}


export type RideDetailsModalProps = {
    closeModal: () => void;
    baseFare:number | string;
    //minimumFare: number | string;
    perMinuteFare: number | string;
    perKilometerFare: number | string;
    // EstimatedSurCharges: number | string;
}



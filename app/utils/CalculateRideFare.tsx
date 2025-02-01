import axios from 'axios';
import {DistanceResponse} from "../../types/types";
import extractTimeInMinutes from "../utils/extractTimeInMinutes";
import {FareCharges} from "../../lists/list";
export default async function calculateFare(pickUp: string | number, dropOff: string | number) {
    const options = {
        method: 'GET',
        url: 'https://driving-distance-calculator-between-two-points.p.rapidapi.com/data',
        params: {
            origin: pickUp, // Replace with your origin
            destination: dropOff, // Replace with your destination
        },
        headers: {
            'x-rapidapi-key': "edba2d38cfmsh1cd51f5e2d3cfe3p1c0359jsnb5813a5df316",
            'x-rapidapi-host': 'driving-distance-calculator-between-two-points.p.rapidapi.com',
        },
    };

    try {
        const distanceResponse = await axios.request<DistanceResponse>(options);
        const { distance_in_kilometers, travel_time } = distanceResponse.data;

        // Convert `distance_in_kilometers` from a string to a number
        const distanceInKilometers = parseFloat(distance_in_kilometers);

        // Convert `travel_time` into total minutes
        const travelTimeInMinutes = extractTimeInMinutes(travel_time);


        const fares = FareCharges[0]
        const totalFare = fares.pricePerKilometer * distanceInKilometers + fares.pricePerMinute * travelTimeInMinutes
        console.log("calculateFare function called");
        // Return the total fare
        return {
            totalFare,
        };
    } catch (error) {
        console.error("Error fetching distance:", error);
        throw new Error('Could not get distance or travel time');
    }
}





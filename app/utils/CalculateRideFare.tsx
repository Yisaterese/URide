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
            'x-rapidapi-key': process.env.NEXT_PUBLIC_DISTANCE_CALCULATOR_APIKEY, // Ensure this is set
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
        // Return the total fare
        return {
            totalFare,
        };
    } catch (error) {
        console.error("Error fetching distance:", error);
        throw new Error('Could not get distance or travel time');
    }
}





// import axios from "axios";
// import getExchangeRateInNaira from "./exchangeRate";
// import { FareResponse } from "../../types/types";
//
// export default async function RideFareCalculator(
//     pickUpLocationLat: number,
//     pickUpLocationLong: number,
//     dropOffLocationLat: number,
//     dropOffLocationLong: number
// ): Promise<any> {
//     const options = {
//         method: "GET",
//         url: "https://taxi-fare-calculator.p.rapidapi.com/search-geo",
//         params: {
//             dep_lat: pickUpLocationLat,
//             dep_lng: pickUpLocationLong,
//             arr_lat: dropOffLocationLat,
//             arr_lng: dropOffLocationLong,
//         },
//         headers: {
//             "x-rapidapi-key": process.env.NEXT_PUBLIC_DISTANCE_CALCULATOR_APIKEY,
//             "x-rapidapi-host": "taxi-fare-calculator.p.rapidapi.com",
//         },
//     };
//
//     try {
//         const fareResponse = await axios.request<FareResponse>(options);
//         const fares = fareResponse?.data?.journey?.fares[2];
//         console.log(fareResponse.data);
//         console.log(fares);
//         // Check if fares exist and are valid
//         if (!fares || fares.length === 0) {
//             throw new Error("No fare data available from the response.");
//         }
//
//         // Get the first valid fare
//         const validFare = fares.find(
//             (fare) =>
//                 typeof fare.price_in_cents === "number" && // Ensure it's a number
//                 !isNaN(fare.price_in_cents)
//         );
//
//         if (!validFare) {
//             throw new Error("No valid fare found in the response.");
//         }
//
//         const fareInCents = validFare.price_in_cents; // It's now guaranteed to be a number
//         const fareInUSD = fareInCents / 100; // Convert cents to USD
//         const exchangeRateToNaira = await getExchangeRateInNaira("USD");
//
//         // Step 3: Convert the fare to Naira
//         const fareInNaira = fareInUSD * exchangeRateToNaira;
//         return fareInNaira; // Return the estimated fare directly
//     } catch (err) {
//         console.error("Failed to fetch fare estimate:", err.message);
//         throw new Error("Failed to fetch fare estimate. Please try again.", fareResponse.data);
//     }
// }

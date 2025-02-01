'use client'
import React, {useEffect, useRef, useState} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import 'leaflet-routing-machine';
import {debounce} from "next/dist/server/utils";
import InputTag from '../../components/ride/InputItems'
import styles from '../../styles/styles.module.css';
import RideDetails from '../../components/ride/RideDetails';
import {FareCharges, RideBaseFare, RideDetailsOptions} from '../../lists/list';
import RideDetailsModal from '../../components/ride/RidePriceDetails';
import {RideDetailsProps} from "../../types/types";
import cash from '../../public/ride/cash.png';
import Image from 'next/image';
import TripOriginOutlinedIcon from '@mui/icons-material/TripOriginOutlined';
import ScheduleIcon from '@mui/icons-material/Schedule';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import StopSharpIcon from '@mui/icons-material/StopSharp'   ;
import {getCachedLocation,setCachedLocation} from "../utils/catchUtils";
 import calculateFare from "../utils/CalculateRideFare";
import handleCoordsValidation from "../utils/validateCoordinates";
import {number} from "prop-types";

export default function Search() {
    const [pickUp, setPickUp] = useState('');
    const [dropOff, setDropOff] = useState('');
    const [pickUpCoords, setPickUpCoords] = useState<{ lat: number, lng: number } | null>(null);
    const [dropOffCoords, setDropOffCoords] = useState<{ lat: number, lng: number } | null>(null);
    const [map, setMap] = useState<L.Map | null>(null);
    const [pickUpSuggestions, setPickUpSuggestions] = useState<{ place_id: string; display_name: string }[]>([]);
    const [dropOffSuggestions, setDropOffSuggestions] = useState<{ place_id: string; display_name: string }[]>([]);
    const routeControlRef = useRef<L.Routing.Control | null>(null);
    const [pickUpNow, setPickUpNow] = useState(false);
    const [showRideDetails, setShowRideDetails] = useState(false);
    const [modalData, setModalData] = useState<RideDetailsProps | null>(null);
    const [selectedRideTitle, setSelectedRideTitle] = useState<String>('');
    const[fareInNaira, setFareInNaira] = useState<number>(0);

    const handleRideClick = (data: any) => {
        setModalData(data);
        setSelectedRideTitle(data.title);
    };


    const closeModal = () => {
        setModalData(null);
    };

    //create map instance
    useEffect(() => {
        const mapContainer = document.getElementById('map');
        if (mapContainer && mapContainer._leaflet_id) {
            return;
        }
        if (mapContainer && !map) {
            const mapInstance = L.map(mapContainer).setView([9.0820, 8.6753], 6);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(mapInstance);
            setMap(mapInstance);
        }

        return () => {
            if (map) {
                map.remove();
            }
        };
    }, [map]);

    // location search
    const handleLocationSearch = async (input: string, isPickUp: boolean) => {
        const coordinateRegex = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
        const isCoordinates = coordinateRegex.test(input.trim());

        const cachedData = getCachedLocation(input, isPickUp);
        if (cachedData) {
            if (isPickUp) {
                setPickUpCoords(cachedData.coords);
                setPickUp(cachedData.address);
            } else {
                setDropOffCoords(cachedData.coords);
                setDropOff(cachedData.address);
            }
            return;
        }

        try {
            let coords = null;
            let address = null;

            if (isCoordinates) {
                const options = {
                    method: 'GET',
                    url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
                    params: {
                        location: input.trim(),
                        language: 'en',
                    },
                    headers: {
                        'x-rapidapi-key': process.env.NEXT_PUBLIC_TRUEWAY_API_KEY,
                        'x-rapidapi-host': 'trueway-geocoding.p.rapidapi.com',
                    },
                };

                const response = await axios.request(options);
                const result = response.data?.results?.[0];
                if (result) {
                    coords = {
                        lat: parseFloat(input.split(',')[0]),
                        lng: parseFloat(input.split(',')[1]),
                    };
                    address = result.address;
                }
            } else {
                const options = {
                    method: 'GET',
                    url: 'https://trueway-geocoding.p.rapidapi.com/Geocode',
                    params: {
                        address: input.trim(),
                        language: 'en',
                    },
                    headers: {
                        'x-rapidapi-key': process.env.NEXT_PUBLIC_TRUEWAY_API_KEY,
                        'x-rapidapi-host': 'trueway-geocoding.p.rapidapi.com',
                    },
                };

                const response = await axios.request(options);
                const result = response.data?.results?.[0];
                if (result) {
                    coords = result.location;
                    address = result.address;
                }
            }

            if (coords) {
                if (isPickUp) {
                    setPickUpCoords(coords);
                    setPickUp(address || input);

                    if (map) {
                        L.marker([coords.lat, coords.lng],)
                            .addTo(map)
                            .bindPopup(`<b>Pickup:</b> ${address || input}`)
                            .openPopup();
                    }

                } else {
                    setDropOffCoords(coords);
                    setDropOff(address || input);

                    if (map) {
                        L.marker([coords.lat, coords.lng],)
                            .addTo(map)
                            .bindPopup(`<b className="">Desination:</> ${address || input}`)
                            .openPopup();
                    }
                }

                if (map) {
                    map.setView([coords.lat, coords.lng], 13);
                }
                setCachedLocation(input, { coords, address }, isPickUp);
            }

        } catch (error) {
            throw new Error('Error fetching location details:');
        }
    };

// fetch suggestions
    const fetchSuggestions = debounce(async (query: string, isPickUp: boolean) => {
        if (!query.trim() || query.length <= 2) {
            if (isPickUp) {
                setPickUpSuggestions([]);
            } else {
                setDropOffSuggestions([]);
            }
            return;
        }

        // first check local storage for checked suggestions

        const cachedSuggestions = getCachedLocation(query, isPickUp);
        if (cachedSuggestions) {
            if (isPickUp) {
                setPickUpSuggestions(cachedSuggestions);
            } else {
                setDropOffSuggestions(cachedSuggestions);
            }
            return; // Skip API request since cached suggestions are available
        }
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                params: {
                    q: query,
                    format: 'json',
                    addressdetails: 1,
                    limit: 5,
                },
            });

            const suggestions = response.data as Array<{ place_id: string; display_name: string }>;

            if (suggestions?.length > 0) {
                if (isPickUp) {
                    setPickUpSuggestions(suggestions);
                } else {
                    setDropOffSuggestions(suggestions);
                }
            } else {
                if (isPickUp) {
                    setPickUpSuggestions([]);
                } else {
                    setDropOffSuggestions([]);
                }
                throw new Error('No suggestions available for query:');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error('API Error:', error.response?.data || error.message);
            } else {
                throw new Error('Unexpected Error:');
            }

            if (isPickUp) {
                setPickUpSuggestions([]);
            } else {
                setDropOffSuggestions([]);
            }
        }
    }, 500);


    const handleSearch = async () => {
        if (pickUpCoords && dropOffCoords && map) {
            if (routeControlRef.current) {
                map.removeControl(routeControlRef.current);
                routeControlRef.current = null;
            }

            // Add route control to the map
            routeControlRef.current = L.Routing.control({
                waypoints: [
                    L.latLng(pickUpCoords.lat, pickUpCoords.lng),
                    L.latLng(dropOffCoords.lat, dropOffCoords.lng),
                ],
                routeWhileDragging: true,
                lineOptions: {
                    styles: [{ color: 'black', weight: 5 }],
                    extendToWaypoints: true,
                    missingRouteTolerance: 0.1
                },
            }).addTo(map);

            // update and uncomment later
            // try {
                // Fetch fare based on pickup and dropoff locations
                // const { totalFare } = await calculateFare(pickUp, dropOff);
                // console.log(totalFare);
                // setFareInNaira(totalFare); // Store fare in state
            // } catch (error) {
            //     console.error("Error calculating fare:", error);
                // alert("Could not calculate fare. Please try again.");
                // return;
            // }

            setShowRideDetails(true); // Show ride details after successful fare calculation

            // Handle routing events
            routeControlRef.current.on('routes found', function (e) {
                const routes = e.routes;
            });

            routeControlRef.current.on('routing error', function (e) {
                console.error('Routing error:', e.error);
                alert("Error finding route.");
            });
        } else {
            alert('Please enter both pickup and dropoff locations.');
        }
    };

    return (
        <div className={styles.searchMainDiv}>
            {!showRideDetails ? (
                <div className="border-2 rounded-xl p-3 md:mt-3 sm:w-full md:p-6 md:text-[15px] h-[400px]">
                    <div>
                        <p className="text-[10px] mb-4 font-bold md:text-[20px] md:font-bold">Get a ride</p>

                        {/* Pick Up Input Field */}
                        <div
                            className="flex gap-2 border-2 rounded bg-white mb-2 px-2 outline-none py-2 h-auto w-full text-[10px] md:text-[15px] relative">
                            <TripOriginOutlinedIcon className="text-black md:h-4 md:w-4 w-3 h-3 my-2.6 mt-5"/>
                            <InputTag
                                value={pickUp}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPickUp(e.target.value)}
                                onInput={(e: React.FormEvent<HTMLInputElement>) =>
                                    fetchSuggestions((e.target as HTMLInputElement).value, true)
                                }
                                placeholder="Pick up location"
                                onBlur={() => handleLocationSearch(pickUp, true)}
                                className="bg-transparent outline-none text-black"
                            />
                            {pickUpSuggestions.length > 0 && (
                                <ul className={styles.dropDown}>
                                    {pickUpSuggestions.map((suggestion: any) => (
                                        <li
                                            key={suggestion.place_id}
                                            onClick={() => {
                                                setPickUp(suggestion.display_name);
                                                handleLocationSearch(suggestion.display_name, true);
                                                setPickUpSuggestions([]);
                                            }}
                                            className="p-1 mt-2 cursor-pointer hover:translate-y-[-5px] hover:text-purple-700"
                                        >
                                            {suggestion.display_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Drop Off Input Field */}
                        <div
                            className="flex justify-between border-2 bg-white rounded mb-2 px-2 outline-none py-2 h-auto w-full text-[10px] md:text-[15px] relative">
                            <div className="flex gap-2">
                                <StopSharpIcon className="text-black md:h-4 md:w-4 w-3 h-3 my-2.6 mt-5"/>
                                <InputTag
                                    value={dropOff}
                                    onChange={(e) => setDropOff(e.target.value)}
                                    onInput={(e: React.FormEvent<HTMLInputElement>) =>
                                        fetchSuggestions((e.target as HTMLInputElement).value, false)
                                    }
                                    placeholder="Drop off location"
                                    onBlur={() => handleLocationSearch(dropOff, false)}
                                    className="bg-transparent outline-none text-black"
                                />
                                {dropOffSuggestions.length > 0 && (
                                    <ul className={styles.dropDownOff}>
                                        {dropOffSuggestions.map((suggestion: any) => (
                                            <li
                                                key={suggestion.place_id}
                                                onClick={() => {
                                                    setDropOff(suggestion.display_name);
                                                    handleLocationSearch(suggestion.display_name, false);
                                                    setDropOffSuggestions([]);
                                                }}
                                                className="p-1 mt-2 cursor-pointer hover:translate-y-[-5px] hover:text-purple-700"
                                            >
                                                {suggestion.display_name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Pickup Now Button */}
                        <div
                            className="flex justify-between text-black py-2 px-2 mb-2 w-full bg-white rounded border-2"
                            onClick={() => setPickUpNow(true)}
                        >
                            <div className="flex gap-2">
                                <ScheduleIcon className="h-4 w-4 mt-1"/>
                                <h1>Pickup now</h1>
                            </div>
                            <KeyboardArrowDownIcon className="h-5 w-5 mt-2 font-[900]"/>
                        </div>

                        {/* For Me Option */}
                        <div
                            className="flex justify-evenly w-[150px] gap-2 text-black py-1 mb-2 bg-white rounded-2xl border-2">
                            <PersonIcon className="h-4 w-4 mt-1"/>
                            <h1>For me</h1>
                            <KeyboardArrowDownIcon className="h-5 w-5 mt-1 font-bold"/>
                        </div>

                        {/* Search Button */}
                        <button
                            className="bg-black text-[10px] p-1 md:pt-3 md:p-2 w-full text-white rounded flex justify-center sm:mb-2 md:text-[15px]"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full ">
                    {/* Ride Details Options */}
                    <div className={"overflow-y-auto"}>
                        {RideDetailsOptions.map((ride, index) => (

                            <RideDetails
                                key={index}
                                image={ride.image}
                                title={ride.title}
                                icon={ride.icon}
                                numberOfPersons={ride.numberOfPersons}
                                time={ride.time}
                                text={ride.text}
                                price={`₦${ride.price + fareInNaira.toFixed(2)}` }
                                classname={ride.classname}
                                onClick={() => handleRideClick(ride.title)}
                                isActiveBorder={selectedRideTitle  === ride.title}
                            />
                        ))}
                    </div>

                    {/* Payment Section */}
                    <div className="bg-fixed  shadow-md bottom-0 left-0 right-0 z-10 flex justify-between items-center gap-4 border rounded-lg p-3 bg-white mt-4"
                    >
                        <div className="flex items-center gap-2">
                            <Image src={cash} alt="cash" className="w-5 h-5"/>
                            <h1 className="text-black font-medium">Cash</h1>
                            <KeyboardArrowDownIcon className="h-5 w-5 mt-1 font-bold"/>
                        </div>
                        <button className="rounded bg-black text-white px-4 py-2 text-sm">
                            Request {selectedRideTitle ? `${selectedRideTitle}` : ""}
                        </button>
                    </div>

                    {/* Ride Details Modal */}
                    {modalData && (
                        <RideDetailsModal
                            closeModal={closeModal}
                            EstimatedSurCharges={"NGN 3,060.00"}
                            baseFare={"NGN 1,622.00"}
                            minimumFare={"NGN 2,254.00"}
                            perKilometerFare={FareCharges[0].pricePerKilometer}
                            perMinuteFare={FareCharges[0].pricePerKilometer}
                        />
                    )}
                </div>
            )}
            <div id="map" className={styles.map}></div>
        </div>

    );


}
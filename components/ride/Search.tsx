'use client'
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import 'leaflet-routing-machine';
import styles from '../../styles/styles.module.css';
import {debounce} from "next/dist/server/utils";
import {Icon} from '@iconify/react';
import InputTag from './/InputItems'


export default function Search() {
    const [pickUp, setPickUp] = useState('');
    const [dropOff, setDropOff] = useState('');
    const [pickUpCoords, setPickUpCoords] = useState<{ lat: number, lng: number } | null>(null);
    const [dropOffCoords, setDropOffCoords] = useState<{ lat: number, lng: number } | null>(null);
    const [map, setMap] = useState<L.Map | null>(null);
    const [pickUpSuggestions, setPickUpSuggestions] = useState([]);
    const [dropOffSuggestions, setDropOffSuggestions] = useState([]);
    const routeControlRef = useRef<L.Routing.Control | null>(null);
    const [pickUpNow, setPickUpNow] = useState(false);


    useEffect(() => {
        const mapContainer = document.getElementById('map');
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

    const handleLocationSearch = async (location: string, isPickUp: boolean) => {
        try {
            const options = {
                method: 'GET',
                url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
                params: {
                    location: '37.7879493,-122.3961974',
                    language: 'en'
                },
                headers: {
                    'x-rapidapi-key': process.env.NEXT_PUBLIC_TRUEWAY_API_KEY,
                    'x-rapidapi-host': 'trueway-geocoding.p.rapidapi.com'
                }
            };

            const response = await axios.request(options);

            const result = response.data?.results?.[0];
            if (result && result.geometry && result.geometry.location) {
                const { lat, lng } = result.geometry.location;
                if (isPickUp) {
                    setPickUpCoords({ lat, lng });
                    setPickUp(location);
                } else {
                    setDropOffCoords({ lat, lng });
                    setDropOff(location);
                }

                if (map) {
                    map.setView([lat, lng], 13);
                    L.marker([lat, lng]).addTo(map).bindPopup(location).openPopup();
                }
            } else {
                console.error('No valid location data found for the specified address.');
            }
        } catch (error) {
            console.error('Error fetching location details:', error);
        }
    };



    const fetchSuggestions = debounce(async (query: string, isPickUp: boolean) => {
        if (query.length > 2) {
            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                    params: {
                        q: query,
                        format: 'json',
                        addressdetails: 1,
                        limit: 5,
                    },
                });
                const suggestions = response.data;
                if (isPickUp) {
                    setPickUpSuggestions(suggestions);
                } else {
                    setDropOffSuggestions(suggestions);
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        }
    }, 500);





    const handleSearch = () => {
        if (pickUpCoords && dropOffCoords && map) {
            if (routeControlRef.current) {
                map.removeControl(routeControlRef.current);
            }
            routeControlRef.current = L.Routing.control({
                waypoints: [
                    L.latLng(pickUpCoords.lat, pickUpCoords.lng),
                    L.latLng(dropOffCoords.lat, dropOffCoords.lng),
                ],
            }).addTo(map);
        } else {
            console.log('Please enter both pickup and dropoff locations.');
        }
    };

    return (
        <div className={styles.searchMainDiv}>
            <div className={'border-2 rounded-xl p-3 md:mt-3 sm:w-full  md:p-6 md:text-[15px] h-[400px] '}>
                <div className="">
                    <p className="text-[10px] mb-4 font-bold md:text-[20px] md:font-bold">Get a ride</p>
                    <div className={'flex gap-2 border-2 rounded bg-white mb-2  px-2 outline-none py-2 h-auto  w-full text-[10px] md:text-[15px] relative'}>
                        <Icon icon={'fa-solid:dot-circle'} className={'text-black md:h-4 md:w-4 w-3 h-3 my-2.6 mt-5'}/>
                        <InputTag
                            value={pickUp}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPickUp(e.target.value)}
                            onInput={(e: React.FormEvent<HTMLInputElement>) => fetchSuggestions((e.target as HTMLInputElement).value, true)}
                            placeholder="Pick up location"
                            onBlur={() => handleLocationSearch(pickUp, true)}
                            className="bg-transparent outline-none"
                        />
                        {pickUpSuggestions.length > 0 && (
                            <ul className="suggestions-list">
                                {pickUpSuggestions.map((suggestion: any) => (
                                    <li
                                        key={suggestion.place_id}
                                        onClick={() => {
                                            setPickUp(suggestion.display_name);
                                            handleLocationSearch(suggestion.display_name, true);
                                            setPickUpSuggestions([]);
                                        }}
                                        className="suggestion-item"
                                    >
                                        {suggestion.display_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div
                        className={'flex justify-between border-2 bg-white rounded mb-2  px-2 outline-none py-2 h-auto  w-full text-[10px] md:text-[15px] relative'}>
                        <div className={'flex gap-2 '}>
                            <Icon icon={'mynaui:stop-square-solid'} className={'text-black md:h-4 md:w-4 w-3 h-3 my-2.6 mt-5'}/>
                            <InputTag
                                value={dropOff}
                                onChange={(e) => setDropOff(e.target.value)}
                                onInput={(e) => fetchSuggestions((e.target as HTMLInputElement).value, false)}
                                placeholder="Drop off location"
                                onBlur={() => handleLocationSearch(dropOff, false)}
                                className="bg-transparent outline-none"
                            />
                            {dropOffSuggestions.length > 0 && (
                                <ul className={styles.suggestionsList}>
                                    {dropOffSuggestions.map((suggestion: any) => (
                                        <li
                                            key={suggestion.place_id}
                                            onClick={() => {
                                                setDropOff(suggestion.display_name);
                                                handleLocationSearch(suggestion.display_name, false);
                                                setDropOffSuggestions([]);
                                            }}
                                            className={styles.suggestionItem}
                                        >
                                            {suggestion.display_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <Icon icon={'flowbite:circle-plus-solid'} className={'h-4 w-4 text-black mt-5'}/>
                    </div>

                    <div className={'flex justify-between text-black py-2 px-2 mb-2  w-full bg-white rounded border-2'} onClick={()=> setPickUpNow( true)}>
                        <div className={'flex gap-2'}>
                            <Icon icon={'svg-spinners:clock'} className={'h-4 w-4 mt-1'}/>
                            <h1>Pickup now</h1>
                        </div>
                        <Icon icon={'mdi:chevron-down'} className={'h-5 w-5 mt-2 font-[900]'}/>
                    </div>


                    <div
                        className={'flex justify-evenly w-[150px] gap-2 text-black  py-1  mb-2 bg-white rounded-2xl border-2'}>
                        <Icon icon={'mdi:person'} className={'h-4 w-4 mt-1'}/>
                        <h1>For me</h1>
                        <Icon icon={'mdi:chevron-down'} className={'h-5 w-5 mt-1 font-bold'}/>
                    </div>

                    <button
                        className="bg-black  text-[10px] p-1 md:pt-3 md:p-2 w-full text-white rounded flex justify-center sm:mb-2 md:text-[15px]"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>

            <div id="map" className={styles.map}></div>
        </div>

    );
}

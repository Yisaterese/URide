'use client';
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import 'leaflet-routing-machine';
import styles from '../styles/styles.module.css';
import { debounce } from 'next/dist/server/utils';
import InputTag from '../components/ride/InputItems';
import Navbar from '../components/home/HomepageNav';
import RideWithURide from '../public/home/RideWithURide.png';
import Image from 'next/image';
import StopSharpIcon from '@mui/icons-material/StopSharp';



export default function Search() {
    const [pickUp, setPickUp] = useState('');
    const [dropOff, setDropOff] = useState('');
    const [pickUpCoords, setPickUpCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [dropOffCoords, setDropOffCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [map, setMap] = useState<L.Map | null>(null);
    const [pickUpSuggestions, setPickUpSuggestions] = useState([]);
    const [dropOffSuggestions, setDropOffSuggestions] = useState([]);
    const routeControlRef = useRef<L.Routing.Control | null>(null);
    const [isLargeScreen, setIsLargeScreen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 993);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const mapContainer = document.getElementById('map');
        if (mapContainer && mapContainer._leaflet_id) {
            return;
        }
        if (mapContainer && !map && isLargeScreen) {
            const mapInstance = L.map(mapContainer).setView([9.082, 8.6753], 6);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
            }).addTo(mapInstance);
            setMap(mapInstance);
        }

        return () => {
            if (map) {
                map.remove();
                setMap(null);
            }
        };
    }, [map, isLargeScreen]);

    const handleLocationSearch = async (input: string, isPickUp: boolean) => {
        const coordinateRegex = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
        const isCoordinates = coordinateRegex.test(input.trim());

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
                        L.marker([coords.lat, coords.lng], )
                            .addTo(map)
                            .bindPopup(`<b>Pickup:</b> ${address || input}`)
                            .openPopup();
                    }
                } else {
                    setDropOffCoords(coords);
                    setDropOff(address || input);

                    if (map) {
                        L.marker([coords.lat, coords.lng], )
                            .addTo(map)
                            .bindPopup(`<b class="">Desination:</b> ${address || input}`)
                            .openPopup();
                    }
                }

                if (map) {
                    map.setView([coords.lat, coords.lng], 13);
                }
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
                routeControlRef.current = null;
            }

            routeControlRef.current = L.Routing.control({
                waypoints: [
                    L.latLng(pickUpCoords.lat, pickUpCoords.lng),
                    L.latLng(dropOffCoords.lat, dropOffCoords.lng),
                ],
                routeWhileDragging: true,
                lineOptions: {
                    styles: [{ color: 'black', weight: 6 }],
                    extendToWaypoints: true,
                    missingRouteTolerance: 0.1
                },
            }).addTo(map);

            routeControlRef.current.on('routesfound', function (e) {
                const routes = e.routes;
                console.log('Routes found:', routes);
            });

            routeControlRef.current.on('routingerror', function (e) {
                console.error('Routing error:', e.error);
            });
        } else {
            console.log('Please enter both pickup and dropoff locations.');
        }
    };




    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className={`${isLargeScreen ? 'bg-white pt-8 px-10' : 'bg-black pt-8'} `}>
                <div className={styles.searchMainDiv}>
                    <div className={`border-2 rounded-xl p-3 md:mt-3 sm:w-full md:p-6 md:text-[15px] h-[400px]  ${isLargeScreen? 'bg-white': 'bg-black'}`}>
                        <div>
                            <p className={`mb-4 text-[50px]  md:text-[20px] md:font-extrabold  text-black ${isLargeScreen ? 'text-black' : 'text-white'}`}>
                                Go anywhere with<br/> URide
                            </p>
                            <div
                                className={`flex gap-2 border-2 rounded bg-[#F3F3F3] mb-2 px-2 outline-none py-2 h-auto 
                                        ${isLargeScreen ? 'py-1' : 'py-1'} h-auto 
                                    ${isLargeScreen ? 'w-full' : 'w-1/2 '} text-[10px] md:text-[15px] relative text-white`}
                            >
                                <AdjustOutlinedIcon className={`md:h-4 md:w-4 w-3 h-3 my-2.6 mt-5  text-black`}/>
                                <InputTag
                                    value={pickUp}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPickUp(e.target.value)}
                                    onInput={(e: React.FormEvent<HTMLInputElement>) =>
                                        fetchSuggestions((e.target as HTMLInputElement).value, true)
                                    }
                                    placeholder="Pick up location"
                                    onBlur={() => handleLocationSearch(pickUp, true)}
                                    className="bg-transparent outline-none text-black w-full "
                                />
                            </div>

                            <div
                                className={`flex gap-2 border-2 bg-[#F3F3F3] rounded mb-2 px-2 outline-none py-2 h-auto 
                                            ${isLargeScreen ? 'w-full' : 'w-1/2'} text-[10px] md:text-[15px] relative text-white`}
                            >
                                <StopSharpIcon className="text-black md:h-4 md:w-4 w-3 h-3 my-2.6 mt-5"/>
                                <InputTag
                                    value={dropOff}
                                    onChange={(e) => setDropOff(e.target.value)}
                                    onInput={(e) =>
                                        fetchSuggestions((e.target as HTMLInputElement).value, false)
                                    }
                                    placeholder="Drop off location"
                                    onBlur={() => handleLocationSearch(dropOff, false)}
                                    className={`bg-transparent outline-none w-full text-black`}
                                />
                            </div>

                            <button
                                className={`p-1 md:pt-3 md:p-2 w-full rounded flex justify-center sm:mb-2 md:text-[15px]
                                    ${isLargeScreen ? 'bg-black text-white' : 'bg-white text-black'}
                                    ${isLargeScreen ? 'w-full' : 'w-[25%]'}
                                    `}
                                onClick={handleSearch}
                            >
                                See prices
                            </button>
                        </div>
                    </div>
                    {isLargeScreen && <div id="map" className={styles.homepageMap}></div>}
                </div>
                {!isLargeScreen && (
                    <div className="mx-10 pb-10">
                        <Image src={RideWithURide} alt="RideWithURide" className="w-full h-auto " />
                    </div>
                )}
            </div>
            {/*<Footer/>*/}
        </div>
    );
}

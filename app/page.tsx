'use client';
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import 'leaflet-routing-machine';
import styles from '../styles/styles.module.css';
import InputTag from '../components/ride/InputItems';
import Navbar from '../components/home/HomepageNav';
import RideWithURide from '../public/home/RideWithURide.png';
import Image from 'next/image';
import { debounce } from "next/dist/server/utils";

export default function Search() {
    const [pickUp, setPickUp] = useState('');
    const [dropOff, setDropOff] = useState('');
    const [pickUpCoords, setPickUpCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [dropOffCoords, setDropOffCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [pickUpSuggestions, setPickUpSuggestions] = useState([]);
    const [dropOffSuggestions, setDropOffSuggestions] = useState([]);
    const mapRef = useRef<L.Map | null>(null);
    const routeControlRef = useRef<L.Routing.Control| null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mapContainer = document.getElementById('map');
            if (!mapRef.current && mapContainer) {
                mapRef.current = L.map(mapContainer).setView([9.082, 8.6753], 6);
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap contributors',
                }).addTo(mapRef.current);
            }
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []); // Runs once after mounting

    const handleLocationSearch = async (input: string, isPickUp: boolean) => {
        const coordinateRegex = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
        const isCoordinates = coordinateRegex.test(input.trim());

        try {
            let coords = null;
            let address = null;

            if (isCoordinates) {
                const response = await axios.get(`https://trueway-geocoding.p.rapidapi.com/ReverseGeocode`, {
                    params: { location: input.trim(), language: 'en' },
                    headers: {
                        'x-rapidapi-key': process.env.NEXT_PUBLIC_TRUEWAY_API_KEY,
                        'x-rapidapi-host': 'trueway-geocoding.p.rapidapi.com',
                    },
                });
                const result = response.data?.results?.[0];
                if (result) {
                    coords = {
                        lat: parseFloat(input.split(',')[0]),
                        lng: parseFloat(input.split(',')[1]),
                    };
                    address = result.address;
                }
            } else {
                const response = await axios.get(`https://trueway-geocoding.p.rapidapi.com/Geocode`, {
                    params: { address: input.trim(), language: 'en' },
                    headers: {
                        'x-rapidapi-key': process.env.NEXT_PUBLIC_TRUEWAY_API_KEY,
                        'x-rapidapi-host': 'trueway-geocoding.p.rapidapi.com',
                    },
                });
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
                } else {
                    setDropOffCoords(coords);
                    setDropOff(address || input);
                }

                if (mapRef.current) {
                    L.marker([coords.lat, coords.lng])
                        .addTo(mapRef.current)
                        .bindPopup(`<b>${isPickUp ? 'Pickup' : 'Destination'}:</b> ${address || input}`)
                        .openPopup();
                    mapRef.current.setView([coords.lat, coords.lng], 13);
                }
            }
        } catch (error) {
            throw new Error('Error fetching location details.');
        }
    };

    const fetchSuggestions = debounce(async (query: string, isPickUp: boolean) => {
        if (query.length > 2) {
            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                    params: { q: query, format: 'json', addressdetails: 1, limit: 5 },
                });
                if (isPickUp) setPickUpSuggestions(response.data);
                else setDropOffSuggestions(response.data);
            } catch (error) {
                throw new Error('Error fetching suggestions.');
            }
        }
    }, 500);

    const handleSearch = () => {
        if (pickUpCoords && dropOffCoords && mapRef.current) {
            if (routeControlRef.current) {
                mapRef.current.removeControl(routeControlRef.current);
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
                    extendToWaypoints: false,
                    missingRouteTolerance: 0,
                },
            }).addTo(mapRef.current);
        } else {
            throw new Error('Please enter both pickup and dropoff locations.');
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="bg-white pt-8 px-1078">
                <div className={styles.searchMainDiv}>
                    <div className={styles.searchMainDiv1}>
                        <p className={styles.anyWhereText}>
                            Go anywhere with<br /> URide
                        </p>
                        <InputTag  className={"bg-transparent"} value={pickUp} onChange={(e) => setPickUp(e.target.value)} onBlur={() => handleLocationSearch(pickUp, true)} placeholder="Pick up location" />
                        <InputTag  className={"bg-[#F3F3F3] "} value={dropOff} onChange={(e) => setDropOff(e.target.value)} onBlur={() => handleLocationSearch(dropOff, false)} placeholder="Drop off location" />
                        <button className="p-2 mb-0 w-full rounded bg-black text-white" onClick={handleSearch}>
                            See prices
                        </button>
                    </div>
                    <div id="map" className={styles.homepageMap}></div>
                </div>
                <Image src={RideWithURide} alt="RideWithURide" className={styles.rideWithUride} />
            </div>
        </div>
    );
}

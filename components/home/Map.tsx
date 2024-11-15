'use client';
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '../../styles/styles.module.css';

export default function Map() {
    useEffect(() => {
        const mapContainer = document.getElementById('map');

        if (mapContainer && !(mapContainer as any)._leaflet_id) {
            const map = L.map(mapContainer).setView([9.0820, 8.6753], 6);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        }

        return () => {
            if (mapContainer && (mapContainer as any)._leaflet_id) {
                const mapInstance = L.map(mapContainer);
                mapInstance.remove();
            }
        };
    }, []);

    return <div id="map" className={styles.map}></div>;
}

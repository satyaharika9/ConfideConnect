import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Box from '@mui/material/Box';
import { fetchEvents } from "../../services/eventService";
import SetViewOnClick from "./SetViewOnClick";

const EventMap = ({ focusedEvent }) => {
    const [events, setEvents] = useState([]);
    const defaultCenter = [42.3601, -71.0589];
    const defaultZoom = 13;

    useEffect(() => {
        async function loadEvents() {
            const eventData = await fetchEvents();
            setEvents(eventData);
        }
        loadEvents();
    }, []);

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <MapContainer center={defaultCenter} zoom={defaultZoom} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                {events.map(event => (
                    <Marker key={event._id} position={[event.coords.latitude, event.coords.longitude]}>
                        <Popup>
                            <div style={{ color: '#007BFF', fontWeight: 'bold' }}>{event.name}</div>
                            <div style={{ color: '#28A745' }}>{event.description}</div>
                            <div style={{ color: '#FFC107' }}>
                                {event.address.street}<br />
                                {event.address.city}
                            </div>
                            {event.weather && (
                                <div style={{ color: '#DC3545', fontStyle: 'italic' }}>
                                    Weather on event day: {event.weather.temperature}°F
                                </div>
                            )}
                        </Popup>
                    </Marker>
                ))}
                {focusedEvent && <SetViewOnClick coords={[focusedEvent.coords.latitude, focusedEvent.coords.longitude]} zoom={16} />}
            </MapContainer>
        </Box>
    );
};

export default EventMap;

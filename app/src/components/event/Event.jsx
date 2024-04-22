import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Box from '@mui/material/Box';
import { fetchEvents } from "../../services/eventService"; // Import your event fetching service

function SetViewOnClick({ coords, zoom }) {
  const map = useMap();
  map.setView(coords, zoom);
  return null;
}

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
                            {event.name}<br />
                            {event.description}<br />
                            {event.address.street}<br />
                            {event.address.city}
                        </Popup>
                    </Marker>
                ))}
                {focusedEvent && <SetViewOnClick coords={[focusedEvent.coords.latitude, focusedEvent.coords.longitude]} zoom={16} />}
            </MapContainer>
        </Box>
    );
};

export default EventMap;
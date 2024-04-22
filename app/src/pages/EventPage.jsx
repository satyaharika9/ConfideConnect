import React, { useState } from 'react';
import EventCards from '../components/event/EventList';
import EventMap from '../components/event/Event';
import Box from '@mui/material/Box';

const EventsPage = () => {
    const [focusedEvent, setFocusedEvent] = useState(null);

    const handleEventSelect = (event) => {
        setFocusedEvent(event); 
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
            <Box sx={{ height: '200px', width: '100%' }}>
                <EventCards onEventSelect={handleEventSelect} />
            </Box>
            <Box sx={{ flexGrow: 1, width: '100%' }}>
                <EventMap focusedEvent={focusedEvent} />
            </Box>
        </Box>
    );
};

export default EventsPage;
import React, { useState } from "react";
import EventCards from "./EventList";
import EventMap from "./Event";
import { Box } from '@mui/material';

const MainComponent = () => {
    const [focusedEvent, setFocusedEvent] = useState(null);

    const handleEventSelect = event => {
        setFocusedEvent(event);
    };

    return (
<Box sx={{ bgcolor: 'background.default', color: 'text.primary', overflowX: 'auto', overflowY: 'auto' }}>
    <EventCards onEventSelect={handleEventSelect} />
    <EventMap focusedEvent={focusedEvent} />
</Box>
    );
};

export default MainComponent;
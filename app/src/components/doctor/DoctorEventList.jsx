import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import eventService from "../../services/eventService";


const DoctorEventList = () => {

    const user = useSelector((state) => state.user);

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventsData = await eventService.getEventsForCreator(user.user.doctorId);
                console.log("eventsData : ", eventsData);
                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteClick = () => {
        console.log('Delete button clicked');
    };

    return (
        <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
            <Table aria-label="medical request table">
                <TableHead>
                    <TableRow>
                        <TableCell>Event</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Created Date</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {events.map((event, index) => (
                        <TableRow key={index}>
                            <TableCell>{event.name}</TableCell>
                            <TableCell>{event.description}</TableCell>
                            <TableCell>{event.createdDate}</TableCell>
                            <TableCell>{event.address.city}</TableCell>
                            <TableCell>
                                <Tooltip title="Delete Event">
                                    <Button onClick={() => handleDeleteClick()}><DeleteIcon /></Button>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DoctorEventList;
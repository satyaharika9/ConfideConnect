import React, { useEffect, useState } from 'react';
import { Button, Paper, CircularProgress, Grid, Typography,IconButton, Box,Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import eventService from '../../services/eventService';

const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    const fetchEvents = async () => {
        setLoading(true);
        eventService.getEvents().then((data) => {
            setEvents(data);
            setLoading(false);
        }).catch((err) => {
            console.error('Something went wrong:', err);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleOpen = (event) => {
        setEditingEvent(event);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setEditingEvent(null);
    }

    const handleSave = () => {
        console.log('Updating event...',editingEvent);
        eventService.updateEvent(editingEvent).then(() => {
            fetchEvents();
            handleClose();
        }).catch((error) => {
            console.error('Something went wrong:', error);
        });
    };

    const handleDelete = (id) => (e) =>{
        e.stopPropagation(); // Prevent opening the edit dialog or any other click propagation issues
        console.log('Deleting event...',id);
        eventService.deleteEvent(id).then(() => {
            fetchEvents();
        }).catch((error) => {
            console.error('Something went wrong:', error);
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        const keys = name.split('.');
        
        setEditingEvent(prev => {
            let updated = {...prev}; // Copy the current state
            let current = updated;
            
            keys.forEach((key, index) => {
                if (index === keys.length - 1) {
                    current[key] = value; // Set the value at the final key
                } else {
                    if (!current[key]) current[key] = {}; // Ensure nested object exists
                    current = current[key]; // Move reference down to the nested object
                }
            });
            
            return updated;
        });
    };

    return (
        <>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 64px)',
            width: 'calc(100vw - 15vw)',
            backgroundColor: 'white',
            overflow: 'hidden',
            marginLeft: '-28px'
        }}>
             <Paper sx={{ width: '100%', overflowX: 'auto', padding: 2 }}>
                <Grid container spacing={2} sx={{ minWidth: 1600, alignItems: 'center' }}>
                    {/* Header Row */}
                    <Grid item xs={12}>
                        <Grid container spacing={1} sx={{ fontWeight: 'bold', borderBottom: '2px solid white' }}>
                        <Grid item xs={2}><Typography>Event ID</Typography></Grid>
                        <Grid item xs={1.5}><Typography>Event Name</Typography></Grid>
                        <Grid item xs={2}><Typography>Description</Typography></Grid>
                        <Grid item xs={2}><Typography>Address</Typography></Grid>
                        <Grid item xs={1.5}><Typography>Creation Time</Typography></Grid>
                        <Grid item xs={2}><Typography>Creator Id</Typography></Grid>
                        <Grid item xs={0.5}></Grid>
                    </Grid>
                    </Grid>
                    {/* Event Data Rows */}
                    {loading ? (
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Grid>
                    ) : (
                        events.map(event => (
                            <Grid item xs={12} key={event._id} onClick={() => handleOpen(event)} sx={{ cursor: 'pointer', borderBottom: '2px solid white', padding: 1 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={2}><Typography>{event._id}</Typography></Grid>
                                    <Grid item xs={1.5}><Typography>{event.name}</Typography></Grid>
                                    <Grid item xs={2}><Typography>{event.description}</Typography></Grid>
                                    <Grid item xs={2}><Typography>{[event.address?.street, event.address?.city, event.address?.state, event.address?.country, event.address?.zip].filter(Boolean).join(', ')}</Typography></Grid>
                                    <Grid item xs={1.5}><Typography>{event.creationTime? new Date(patient.dob).toLocaleDateString() : 'N/A'}</Typography></Grid>
                                    <Grid item xs={2}><Typography>{event.creatorId}</Typography></Grid>
                                    <Grid item xs={0.5}>
                                    <IconButton  onClick={handleDelete(event._id)} aria-label="delete">
        <DeleteIcon />
    </IconButton></Grid>
                                    
                                </Grid>
                            </Grid>
                        ))
                    )}
        </Grid>
        </Paper> 
        {/* Edit Event Dialog */}
        {
            editingEvent && (
                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Edit Event</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        margin="dense"
                                        label="Event Name"
                                        name="name"
                                        value={editingEvent.name || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        name="description"
                                        multiline
                                        rows={4}
                                        value={editingEvent.description|| ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <TextField
                                margin="dense"
                                name="address.street"
                                label="Street"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingEvent.address?.street || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.city"
                                label="City"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingEvent.address?.city || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.state"
                                label="State"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingEvent.address?.state || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.country"
                                label="Country"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingEvent.address?.country || ''}
                            />
                            <TextField
                                margin="dense"
                                name="address.zip"
                                label="Zip Code"
                                type="text"
                                fullWidth
                                onChange={handleChange}
                                value={editingEvent.address?.zip || ''}
                            />
                            </Grid>
                            </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                            <Button onClick={handleSave} color="primary">Save</Button>
                        </DialogActions>
                    </Dialog>
                )}
        </Box>
        </>
    );
}

export default AdminEvents;
import React, { useEffect, useState } from 'react';
import { Button, Paper, CircularProgress, Grid, Typography,IconButton, Box,Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import donationService from '../../services/donationService';

const AdminDonations = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editingDonation, setEditingDonation] = useState(null);

    const fetchDonations = async () => {
        setLoading(true);
        donationService.getDonations().then((data) => {
            setDonations(data);
            setLoading(false);
        }).catch((err) => {
            console.error('Something went wrong:', err);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchDonations();
    }, []);

    const handleOpen = (donation) => {
        setEditingDonation(donation);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setEditingDonation(null);
    }

    const handleSave = () => {
        console.log('Updating donation...',editingDonation);
        donationService.updateDonation(editingDonation).then(() => {
            fetchDonations();
            handleClose();
        }).catch((error) => {
            console.error('Something went wrong:', error);
        });
    };

    const handleDelete = (id) => (e) =>{
        e.stopPropagation(); // Prevent opening the edit dialog or any other click propagation issues
        console.log('Deleting donation...',id);
        donationService.deleteDonation(id).then(() => {
            fetchDonations();
        }).catch((error) => {
            console.error('Something went wrong:', error);
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        const keys = name.split('.');
        
        setEditingDonation(prev => {
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
                <Grid container spacing={2} sx={{ minWidth: 1000, alignItems: 'center' }}>
                    {/* Header Row */}
                    <Grid item xs={12}>
                        <Grid container spacing={1} sx={{ fontWeight: 'bold', borderBottom: '2px solid white' }}>
                        <Grid item xs={3}><Typography>Donation ID</Typography></Grid>
                        <Grid item xs={2}><Typography>Name</Typography></Grid>
                        <Grid item xs={2}><Typography>Amount</Typography></Grid>
                        <Grid item xs={3}><Typography>Creation Time</Typography></Grid>
                        <Grid item xs={1}><Typography>Status</Typography></Grid>
                        <Grid item xs={0.5}></Grid>
                    </Grid>
                    </Grid>
                    {/* Donation Data Rows */}
                    {loading ? (
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Grid>
                    ) : (
                        donations.map(donation => (
                            <Grid item xs={12} key={donation._id} onClick={() => handleOpen(donation)} sx={{ cursor: 'pointer', borderBottom: '2px solid white', padding: 1 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={3}><Typography>{donation._id}</Typography></Grid>
                                    <Grid item xs={2}><Typography>{donation.name}</Typography></Grid>
                                    <Grid item xs={2}><Typography>{donation.amount}</Typography></Grid>
                                    <Grid item xs={3}><Typography>{donation.createdDate? new Date(donation.createdDate).toLocaleDateString() : 'N/A'}</Typography></Grid>
                                    <Grid item xs={1}><Typography>{donation.status}</Typography></Grid>
                                    <Grid item xs={0.5}>
                                    <IconButton  onClick={handleDelete(donation._id)} aria-label="delete">
        <DeleteIcon />
    </IconButton></Grid>
                                    
                                </Grid>
                            </Grid>
                        ))
                    )}
        </Grid>
        </Paper> 
        {/* Edit Donation Dialog */}
        {
            editingDonation && (
                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                    <DialogTitle>Edit Donation</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            value={editingDonation.name}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            id="amount"
                            name="amount"
                            label="Amount"
                            type="text"
                            fullWidth
                            value={editingDonation.amount}
                            onChange={handleChange}
                        />
                      <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            name="status"
                                            value={editingDonation.status}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="success">SUCCESS</MenuItem>
                                            <MenuItem value="failed">FAILED</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                </Dialog>
            )
        }

        </Box>
        </>
    );
}

export default AdminDonations;
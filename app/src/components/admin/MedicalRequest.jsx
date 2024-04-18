import React, { useEffect, useState } from 'react';
import medicalRequestService from '../../services/medicalrequestService';
import { Button, Paper, CircularProgress, Grid, Typography,IconButton, Box,Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const AdminMedicalRequests = () => {
    const [medicalRequests, setMedicalRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editingMedicalRequest, setEditingMedicalRequest] = useState(null);
    const [isNewMedicalRequest, setIsNewMedicalRequest] = useState(false);

    const fetchMedicalRequests = async () => {
        setLoading(true);
       medicalRequestService.getMedicalRequests().then(res => {
            setMedicalRequests(res);
            setLoading(false);
        }).catch(err => {
            console.error('Something went wrong:', err);
            setLoading(false);
        });
    };

    const openNewMedicalRequestForm = () => { 
        setEditingMedicalRequest({ patientId:'',doctorId:'',requestName: '', requestDescription: '', doctorPrescription: '', status: 'REQUESTED', notificationEmail: '', notificationPhone: '', preExistingConditions: [] });
        setIsNewMedicalRequest(true);
        setOpen(true);
    };

    const openEditForm = (medicalRequest) => {
        setEditingMedicalRequest(medicalRequest);
        setIsNewMedicalRequest(false);
        setOpen(true);
    
    }

    useEffect(() => {
        fetchMedicalRequests();
    }, []);

    const handleOpen = (medicalRequest) => {
        setEditingMedicalRequest(medicalRequest);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setEditingMedicalRequest(null);
    }

   const handleSave = () => {
    const action = isNewMedicalRequest ? medicalRequestService.createMedicalRequest : medicalRequestService.updateMedicalRequest;
    console.log('Updating data...', editingMedicalRequest);
    action(editingMedicalRequest).then(() => {
                fetchMedicalRequests(); // Refresh the list after saving
                handleClose();
            }).catch(err => {
                console.error('Update failed:', err);
            });
   };

const handleDelete = (id) => (e) => {
    e.stopPropagation(); // Prevent opening the edit dialog or any other click propagation issues
    console.log('Deleting data with ID:', id);
    medicalRequestService.deleteMedicalRequest(id)
        .then(() => {
            fetchMedicalRequests(); // Refresh the list after deletion
        })
        .catch(err => {
            console.error('Delete failed:', err);
        });
};


   const handleChange = (event) => {
    const { name, value } = event.target;
    const keys = name.split('.');
    
    setEditingMedicalRequest(prev => {
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

const textStyle = {
    wordBreak: 'break-word', // Break the word to next line if needed
    hyphens: 'auto' // Automatically add hyphens when breaking words
};


    return(
        <>
            <Box sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 64px)',
                width: 'calc(100vw - 15vw)',
                backgroundColor: 'white',
                overflow: 'hidden',
                marginLeft: '-28px'
            }}>
                <Button variant="contained" onClick={openNewMedicalRequestForm} sx={{ alignSelf:'flex-end', mt: 2, marginRight: 6}}>New Medical Request</Button>
           <Paper sx={{ width: '100%', overflowX: 'auto',  padding: 2, marginBottom: 2, marginTop:2 }}>
                <Grid container spacing={2} sx={{ minWidth: 2600, alignItems: 'center' }}>
                    {/* Header Row */}
                    <Grid item xs={12}>
                        <Grid container spacing={1} sx={{ fontWeight: 'bold', borderBottom: '2px solid white' } } >
                            <Grid item xs={1} style={textStyle}><Typography>Request ID</Typography></Grid>
                            <Grid item xs={1} style={textStyle}><Typography>Patient ID</Typography></Grid>
                            <Grid item xs={1} style={textStyle}><Typography>Doctor ID</Typography></Grid>
                            <Grid item xs={1} style={textStyle}><Typography>Name</Typography></Grid>
                            <Grid item xs={1} style={textStyle}><Typography>Description</Typography></Grid>
                            <Grid item xs={0.5} style={textStyle}><Typography>Prescription</Typography></Grid>
                            <Grid item xs={1} style={textStyle}><Typography>Status</Typography></Grid>
                            <Grid item xs={1} style={textStyle}><Typography>Notification Email</Typography></Grid>
                            <Grid item xs={1} style={textStyle}><Typography>Notification Phone</Typography></Grid>
                            <Grid item xs={1} style={textStyle}><Typography>Creation Time</Typography></Grid>
                            <Grid item xs={1} style={textStyle}><Typography>Modified Time</Typography></Grid>
                            <Grid item xs={1} style={textStyle}><Typography>Pre Existing Conditions</Typography></Grid>
                            <Grid item xs={0.5}></Grid>
                        </Grid>
                    </Grid>
                    {/* Medical Request Data Rows */}
                    {loading ? (
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Grid>
                    ) : (
                        medicalRequests.map(request => (
                            <Grid item xs={12} key={request._id} onClick={() => openEditForm(request)} sx={{ cursor: 'pointer', borderBottom: '2px solid white', padding: 1 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={1}><Typography style={textStyle}>{request._id}</Typography></Grid>
                                    <Grid item xs={1}><Typography style={textStyle}>{request.patientId}</Typography></Grid>
                                    <Grid item xs={1}><Typography style={textStyle}>{request.doctorId}</Typography></Grid>
                                    <Grid item xs={1}><Typography style={textStyle}>{request.requestName}</Typography></Grid>
                                    <Grid item xs={1}><Typography style={textStyle}>{request.requestDescription}</Typography></Grid>
                                    <Grid item xs={0.5}><Typography style={textStyle}>{request.doctorPrescription}</Typography></Grid>
                                    <Grid item xs={1}><Typography style={textStyle}>{request.status}</Typography></Grid>
                                    <Grid item xs={1}><Typography style={textStyle}>{request.notificationEmail}</Typography></Grid>
                                    <Grid item xs={1}><Typography style={textStyle}>{request.notificationPhone}</Typography></Grid>
                                    <Grid item xs={1}><Typography style={textStyle}>{request.creationTime}</Typography></Grid>
                                    <Grid item xs={1}><Typography style={textStyle}>{request.modifiedTime}</Typography></Grid>
                                    <Grid item xs={1}><Typography style={textStyle}>{request.preExistingConditions}</Typography></Grid>
                                    <Grid item xs={0.5}><IconButton onClick={handleDelete(request._id)} aria-label="delete"><DeleteIcon />
    </IconButton></Grid>
                             </Grid>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Paper>
           
            {/* Edit Dialog */}
            {open && (
                    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                        <DialogTitle>{isNewMedicalRequest?'Create New Medical Request':'Edit Medical Request'}</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2}>
                            <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Patient ID"
                                        name="patientId"
                                        rows={4}
                                        value={editingMedicalRequest.patientId || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Doctor ID"
                                        name="doctorId"
                                        rows={4}
                                        value={editingMedicalRequest.doctorId || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        margin="dense"
                                        label="Request Name"
                                        name="requestName"
                                        value={editingMedicalRequest.requestName || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        name="requestDescription"
                                        multiline
                                        rows={4}
                                        value={editingMedicalRequest.requestDescription || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Prescription"
                                        name="doctorPrescription"
                                        value={editingMedicalRequest.doctorPrescription || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            name="status"
                                            value={editingMedicalRequest.status}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="REQUESTED">REQUESTED</MenuItem>
                                            <MenuItem value="MATCHED">MATCHED</MenuItem>
                                            <MenuItem value="INPROGRESS">INPROGRESS</MenuItem>
                                            <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Notification Email"
                                        name="notificationEmail"
                                        value={editingMedicalRequest.notificationEmail || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Notification Phone"
                                        name="notificationPhone"
                                        value={editingMedicalRequest.notificationPhone || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Pre Existing Conditions"
                                        name="preExistingConditions"
                                        multiline
                                        rows={2}
                                        value={editingMedicalRequest.preExistingConditions.join(', ') || ''}
                                        onChange={(e) => handleChange({ target: { name: 'preExistingConditions', value: e.target.value.split(', ') } })}
                                    />
                                </Grid>
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
    )

}

export default AdminMedicalRequests;
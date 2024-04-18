import React, { useEffect, useState } from 'react';
import { Button, Paper, CircularProgress, Grid, Typography, IconButton, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import userService from '../../services/userService';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [userDetails, setUserDetails] = useState({ username: '', password: '', email: '', role: '' });

    const fetchUsers = async () => {
        setLoading(true);
        userService.getAllUsers().then((res) => {
            setUsers(res);
            setLoading(false);
        }).catch((err)=>{
            console.error('Something went wrong:', err);
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const openNewUserForm = () => {
        setUserDetails({ username: '', password: '', email: '', role: '' });
        setIsNewUser(true);
        setOpen(true);
    };

    const openEditForm = (user) => {
        setUserDetails(user);
        setIsNewUser(false);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const action = isNewUser ? userService.createUser : userService.updateUser;
        console.log(`${isNewUser ? 'Creating' : 'Updating'} user...`, userDetails);
        action(userDetails)
            .then(() => {
                fetchUsers();
                handleClose();
            })
            .catch(err => {
                console.error('Operation failed:', err);
            });
    };

    const handleDelete = (id) => (e) => {
        e.stopPropagation();
        console.log('Deleting user...', id);
        userService.deleteUser(id)
            .then(() => {
                fetchUsers();
            })
            .catch(err => {
                console.error('Delete failed:', err);
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserDetails(prev => ({ ...prev, [name]: value }));
    };

    return (
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
                 <Button sx={{ alignSelf:'flex-end', mt: 2, marginRight: 6}} variant="contained" color="primary" onClick={openNewUserForm}>
                    Create New User
                </Button>
            <Paper sx={{ width: '100%', margin: 0, overflow: 'auto', padding: 2, marginBottom: 2, marginTop:2 }}>
                <Grid container spacing={2} sx={{ alignItems: 'center', fontFamily:'sans-serif' }}>
                    <Grid item xs={12}>
                        <Grid container spacing={1} sx={{ fontWeight: 'bold', borderBottom: '2px solid white'}}>
                            <Grid item xs={3}>User ID</Grid>
                            <Grid item xs={2}>Username</Grid>
                            <Grid item xs={2}>Password</Grid>
                            <Grid item xs={2}>Email</Grid>
                            <Grid item xs={2}>Role</Grid>
                            <Grid item xs={1}></Grid>
                        </Grid>
                    </Grid>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        users.map((user) => (
                            <Grid item xs={12} key={user._id} onClick={() => openEditForm(user)} sx={{ cursor: 'pointer' }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={3}>{user._id}</Grid>
                                    <Grid item xs={2}>{user.username}</Grid>
                                    <Grid item xs={2}>{user.password}</Grid>
                                    <Grid item xs={2}>{user.email}</Grid>
                                    <Grid item xs={2}>{user.role}</Grid>
                                    <Grid item xs={1}>
                                        <IconButton onClick={handleDelete(user._id)}><DeleteIcon /></IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))
                    )}
                </Grid>
               
            </Paper>
            {open && (
                <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                    <DialogTitle>{isNewUser ? 'Create New User' : 'Edit User'}</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" name="username" label="Username" type="text" fullWidth value={userDetails.username} onChange={handleChange} />
                        <TextField margin="dense" name="password" label="Password" type="text" fullWidth value={userDetails.password} onChange={handleChange} />
                        <TextField margin="dense" name="email" label="Email" type="email" fullWidth value={userDetails.email} onChange={handleChange} />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Role</InputLabel>
                            <Select name="role" value={userDetails.role} onChange={handleChange}>
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="patient">Patient</MenuItem>
                                <MenuItem value="doctor">Doctor</MenuItem>
                                <MenuItem value="lab">Lab</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button onClick={handleSave} color="primary">{isNewUser ? 'Create' : 'Save'}</Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
        </>
    );
}


export default AdminUsers;

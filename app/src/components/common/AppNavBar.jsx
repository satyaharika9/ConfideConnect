import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { clearUser } from "../../store/slices/user-slice";


const AppNavbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.accessToken);

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    dispatch(clearUser());
    navigate('/home');
  };

  return (
    <AppBar position="static" color="primary"
    sx={{ 
        backgroundColor: 'black',
     }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <HomeIcon onClick={handleHomeClick} sx={{ mr: 1, cursor: 'pointer' }} />
          <Typography variant="h6" component="div" onClick={handleHomeClick} sx={{ cursor: 'pointer' }}>
            ConfideConnect
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" onClick={() => navigate('/events')}>Events</Button>
        <Button color="inherit" onClick={() => navigate('/blogs')}>Blogs</Button>
        <Button color="inherit" onClick={() => navigate('/donations')}>Donate</Button>
        {isAuthenticated ? (
            <Tooltip title="Logout" placement="bottom">
                <IconButton color="inherit" onClick={handleLogoutClick}>
                    <LogoutIcon />
                </IconButton>
            </Tooltip>
        ) : (
            <Tooltip title="Login" placement="bottom">
                <IconButton color="inherit" onClick={handleLoginClick}>
                    <LoginIcon />
                </IconButton>
            </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppNavbar;
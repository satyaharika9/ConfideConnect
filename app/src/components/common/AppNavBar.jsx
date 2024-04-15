import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';


const AppNavbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // TODO: convert to redux

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    setIsAuthenticated(false);
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
                    <LoginIcon />
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
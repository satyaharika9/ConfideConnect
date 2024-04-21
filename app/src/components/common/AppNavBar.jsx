import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { clearUser } from "../../store/slices/user-slice";


const AppNavbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isAuthenticated = useSelector((state) => state.user.accessToken);
  const user = useSelector((state) => state.user.user);

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    dispatch(clearUser());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user')
    navigate('/home');
  };

  const isActiveRoute = (route) => {
    return location.pathname === route;
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
        {user ? (
          <Button color="inherit" onClick={() => navigate(`/${user.role}`)}
              variant={isActiveRoute(`/${user.role}`) ? "contained" : "text"}>
            My Dashboard
          </Button>
        ) : null}
        <Button color="inherit" onClick={() => navigate('/events')} 
            variant={isActiveRoute('/events') ? "contained" : "text"}>
          Events
        </Button>
        <Button color="inherit" onClick={() => navigate('/blogs')}
            variant={isActiveRoute('/blogs') ? "contained" : "text"}>
          Blogs
        </Button>
        <Button color="inherit" onClick={() => navigate('/donations')}
            variant={isActiveRoute('/donations') ? "contained" : "text"}>
          Donate
        </Button>
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
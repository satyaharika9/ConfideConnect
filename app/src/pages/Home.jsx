import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';


const Home = () => {

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Box sx={{
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'right',
      alignItems: 'start',
      height: '100vh',
    }}>
      <Button 
        sx={{
          margin: '15px'
        }}
        onClick={handleLoginClick}>Login</Button>
    </Box>
  );

};

export default Home;

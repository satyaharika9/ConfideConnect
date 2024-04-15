import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ribbonImage4 from '../assets/images/ribbon7.png'; 


const Home = () => {

  return (
    <Box  
    sx={{
      backgroundColor: 'black',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 64px)',
    }}
    >
      <img
        src={ribbonImage4}
        alt="AIDS Ribbon"
        style={{
          maxWidth: '350px',
          maxHeight: '350px',
        }}
      />
      <Typography variant="h4" component="h1" style={{ color: 'white', marginTop: '30px' }}>
        ConfideConnect
      </Typography>
    </Box>
  );

};

export default Home;

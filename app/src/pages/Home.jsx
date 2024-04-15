import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

import ribbonImage4 from '../assets/images/ribbon4.png'; 


const Home = () => {

  return (
    <Box  
    sx={{
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 64px)',
    }}
    >
      <img
        src={ribbonImage4}
        alt="AIDS Ribbon"
        style={{
          maxWidth: '300px',
          maxHeight: '300px',
        }}
      />
    </Box>
  );

};

export default Home;

import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ribbonImage4 from '../assets/images/ribbon7.png'; 
import { useTranslation } from 'react-i18next';


const Home = () => {

  // state variables
  const { t , i18n} = useTranslation('common');

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
      <Typography 
        variant="h4" 
        style={{ 
          marginTop: '15px',
          backgroundImage: 'linear-gradient(45deg, #FFFFFF, #CCCCCC)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 4px 10px rgba(0,0,0,0.6)',
          fontSize: '3rem',
        }}
      >
        {t('confide_connect')}
      </Typography>
    </Box>
  );

};

export default Home;

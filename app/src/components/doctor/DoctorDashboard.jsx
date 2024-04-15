import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const DoctorDashboard = () => {

  const currentUser = useSelector((state) => state.user);

  return (
    <Box sx={{
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 64px)',
    }}>
        {console.log("currentuser: ",currentUser)}
      <Box sx={{ width: '40vw' }}>
        <Typography variant="h2" color="primary"> Heloooo {currentUser.user.role}</Typography>
      </Box>
    </Box>
  );
};

export default DoctorDashboard;

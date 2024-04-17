import React from 'react';
import { Box, Avatar, Typography, Button } from '@mui/material';


const Sidebar = ({ currentUser }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Avatar
        alt={currentUser.user.username}
        // src={currentUser.user.profilepicture}
        sx={{ width: 100, height: 100 }}
      />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {currentUser.user.username}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {currentUser.user.email}
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }}>
        Manage Profile
      </Button>
    </Box>
  );
};

export default Sidebar;
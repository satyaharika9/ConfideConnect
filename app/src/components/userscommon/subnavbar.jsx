import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';


const SubNavBar = ({ items, handleTabChange, tabIndex }) => {

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        {items.map((item, index) => (
          <Tab key={index} label={item} />
        ))}
      </Tabs>
    </Box>
  );
};

export default SubNavBar;
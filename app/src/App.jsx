import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AppRoutes from './Routes';
import './App.css'


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    allVariants: {
      color: 'rgba(255, 255, 255, 0.87)', 
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <Router basename="/confideconnect">
        <AppRoutes />
      </Router>
    </ThemeProvider>
  )
}

export default App

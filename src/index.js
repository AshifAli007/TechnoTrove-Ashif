import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Define your Material-UI theme
const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#3fc337', // Example color, align this with your custom theme
    },
    secondary: {
      main: '#EAEAEA', // Example secondary color
    },
    text: {
      primary: '#212121',
    },
  },
});

// Get the root element from the DOM
const container = document.getElementById('root');
const root = createRoot(container); // Create a root.

// Render the app inside the ThemeContextProvider and ThemeProvider
root.render(
  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Call reportWebVitals, if necessary
reportWebVitals();

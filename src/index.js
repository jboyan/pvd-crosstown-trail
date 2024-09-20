import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Navigate, RouterProvider,} from "react-router-dom";

import App from './App';
import NotFound from './NotFound';

import reportWebVitals from './reportWebVitals';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '/node_modules/mapbox-gl/dist/mapbox-gl.css'
import './index.css';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Home from "./crosstown/home";


const theme = createTheme({
    palette: {
        primary: {
            main: '#0D47A1',  // Professional deep blue
        },
        secondary: {
            main: '#757575',  // Neutral gray
        },
        background: {
            default: '#f5f5f5',  // Light gray background
        },
        text: {
            primary: '#212121',  // Dark gray text for readability
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700, // Bold titles
        },
        body1: {
            fontSize: '1rem', // Normal body text
        },
    },
});

function CrosstownHome() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/> {/* Ensures consistent styling across browsers */}
            <Home/>
        </ThemeProvider>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/crosstown" replace/>,
    },
    {
        path: "/crosstown",
        element: <CrosstownHome/>,
    },
    {
        path: "/crosstown/map",
        element: <App/>,
    },
    {
        path: "*",  // Wildcard route for unmatched paths
        element: <NotFound/>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

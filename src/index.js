import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Navigate, RouterProvider,} from "react-router-dom";

import NotFound from './NotFound';

import reportWebVitals from './reportWebVitals';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '/node_modules/mapbox-gl/dist/mapbox-gl.css'
import './index.css';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import TrailLandingPage from './trails/TrailLandingPage';
import TrailMapPage from './trails/TrailMapPage';
import TrailsHomePage from './trails/TrailsHomePage';

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

const router = createBrowserRouter([
    {
        path: "/",
        element: <TrailsHomePage/>,
    },
    {
        path: "/pvd",
        element: <Navigate to="/trails/pvd-crosstown-trail" replace/>,
    },
    {
        path: "/trails/pvd-crosstown",
        element: <Navigate to="/trails/pvd-crosstown-trail" replace/>,
    },
    {
        path: "/trails/pvd-crosstown/map",
        element: <Navigate to="/trails/pvd-crosstown-trail/map" replace/>,
    },
    {
        path: "/loop",
        element: <Navigate to="/trails/pvd-crosstown-loop" replace/>,
    },
    {
        path: "/west",
        element: <Navigate to="/trails/pvd-crosstown-west" replace/>,
    },
    {
        path: "/south",
        element: <Navigate to="/trails/pvd-crosstown-south" replace/>,
    },
    {
        path: "/lovecraft",
        element: <Navigate to="/trails/lovecrafts-college-hill" replace/>,
    },
    {
        path: "/crosstown",
        element: <Navigate to="/trails/pvd-crosstown-trail" replace/>,
    },
    {
        path: "/crosstown/map",
        element: <Navigate to="/trails/pvd-crosstown-trail/map" replace/>,
    },
    {
        path: "/crosstown-west",
        element: <Navigate to="/trails/pvd-crosstown-west" replace/>,
    },
    {
        path: "/trails/:slug",
        element: <TrailLandingPage/>,
    },
    {
        path: "/trails/:slug/map",
        element: <TrailMapPage/>,
    },
    {
        path: "*",  // Wildcard route for unmatched paths
        element: <NotFound/>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Ensures consistent styling across browsers */}
            <RouterProvider router={router}/>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

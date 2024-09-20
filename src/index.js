import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Navigate, RouterProvider,} from "react-router-dom";

import App from './App';
import Home from './crosstown/home';
import NotFound from './NotFound';

import reportWebVitals from './reportWebVitals';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '/node_modules/mapbox-gl/dist/mapbox-gl.css'
import './index.css';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/crosstown" replace/>,
    },
    {
        path: "/crosstown",
        element: <Home/>,
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

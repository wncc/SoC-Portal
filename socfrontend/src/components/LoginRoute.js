import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import api from '../utils/api';


const LoginRoute = ( {authToken}) => {
    console.log("authToken:", authToken);
    if (!authToken) {
        return <Outlet/>
    } else {
        return <Navigate to="/" />
    }
};

export default LoginRoute;
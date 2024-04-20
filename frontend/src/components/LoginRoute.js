import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'


const LoginRoute = ({ authToken }  ) => {
    console.log("authToken:", authToken);
    if (!authToken) {
        return <Outlet/>
    } else {
        return <Navigate to="/" />
    }
};

export default LoginRoute;
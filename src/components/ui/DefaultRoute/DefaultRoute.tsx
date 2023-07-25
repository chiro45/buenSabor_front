import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { alertError } from '../../../functions/alerts'

const DefaultRoute = ({ children, user }: any) => {
    const location = useLocation();
    useEffect(() => {

        if (location.pathname !== '/' &&
            location.pathname !== '/kitchen/process' &&
            location.pathname !== '/deliveryView' &&
            location.pathname !== '/caseRegister/process' &&
            location.pathname !== '/address' &&
            location.pathname !== '/config/admin') {
            alertError('Inicie sesión con credenciales validas para continuar', 'Usuario no autorizado');
        }
    }, [location]);


    return children;
};

export default DefaultRoute;
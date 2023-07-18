import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'
import { getElementSetState } from '../helpers';
import { IUsuario } from '../interfaces';
import { useAccessToken } from './useAccessToken';
const urlUsuario = `${import.meta.env.VITE_URL_USUARIO}`
const useUser = async() => {
    const headers = useAccessToken();
    const { user, isAuthenticated } = useAuth0();
    const [userBD, setuserBD] = useState<IUsuario>()
    const getUsuario = () => {
        getElementSetState(`${urlUsuario}/getByUsuario/${user?.email}`, headers, setuserBD);
    }
    useEffect(() => {
        if (isAuthenticated) {
            getUsuario();
        }
    }, [isAuthenticated, ])
    
    return userBD;
}

export default useUser

import { useAuth0 } from '@auth0/auth0-react';
import  { useEffect, useState } from 'react'
import { getElementSetState } from '../helpers';
import { IUsuario } from '../interfaces';
const urlUsuario = `${import.meta.env.VITE_URL_USUARIO}`
const useUser = async() => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userBD, setuserBD] = useState<IUsuario>()
    const getUsuario = async () => {
        const token = await getAccessTokenSilently();
        const headers = {
          'Authorization': `Bearer ${token}`
        };
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

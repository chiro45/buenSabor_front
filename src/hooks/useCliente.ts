import { useAuth0 } from '@auth0/auth0-react';
import  { useEffect, useState } from 'react'
import { fetchGet  } from '../helpers';
import { ICliente  } from '../interfaces';
const urlCliente = `${import.meta.env.VITE_URL_CLIENTE}`
const urlUsuario = `${import.meta.env.VITE_URL_USUARIO}`
const useCliente = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [cliente, setCliente] = useState<ICliente>();

    const getUsuario = async () => {
        try {
            const token = await getAccessTokenSilently();
            const headers = {
              'Authorization': `Bearer ${token}`
            };
            const usuarioResponse = await fetchGet(`${urlUsuario}/getByUsuario/${user?.email}`, headers);

            if (usuarioResponse?.idAuth0) {
                const clienteResponse = await fetchGet(`${urlCliente}/getByUsuarioIdAuth0/${usuarioResponse.idAuth0}`, headers);
                setCliente(clienteResponse);
            }
        } catch (error) {
            // Manejo de errores
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            getUsuario();
        }
    }, [isAuthenticated]);

    return cliente;
}

export default useCliente

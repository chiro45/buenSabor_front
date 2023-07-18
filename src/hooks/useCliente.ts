import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'
import { fetchGet, getElementSetState } from '../helpers';
import { ICliente, IUsuario } from '../interfaces';
import { useAccessToken } from './useAccessToken';
const urlCliente = `${import.meta.env.VITE_URL_CLIENTE}`
const urlUsuario = `${import.meta.env.VITE_URL_USUARIO}`
const useCliente = () => {
    const headers = useAccessToken();
    const { user, isAuthenticated } = useAuth0();
    const [cliente, setCliente] = useState<ICliente>();

    const getUsuario = async () => {
        try {
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

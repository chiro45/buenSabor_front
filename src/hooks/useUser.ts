import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react'
import { fetchGet, getElementSetState } from '../helpers';
import { IUsuario } from '../interfaces';
const urlUsuario = `${import.meta.env.VITE_URL_USUARIO}`
const useUser = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0(); // Replace 'your-auth-library' with the actual authentication library you are using
    const [userBD, setUserBD] = useState<IUsuario | null>(null); // Initialize userBD as null initially
    const [isLoading, setIsLoading] = useState(true); // Add a loading state
    const idAuth0 = user?.sub?.split('|').pop();

    const getUsuario = async () => {
        const token = await getAccessTokenSilently();
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        if (idAuth0 !== undefined) {
            const userfetch = await fetchGet(`${urlUsuario}/getByIdAuth0/${idAuth0}`, headers);
            // console.log(userfetch)
            setUserBD(userfetch);
            setIsLoading(false); // Once the user data is fetched, set isLoading to false
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            getUsuario();
        } else {
            setIsLoading(false); // If not authenticated, set isLoading to false
        }
    }, [isAuthenticated]);

    // Return the userBD and isLoading state as an object
    return  userBD;
};

export default useUser;

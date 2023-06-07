import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const useAccessToken = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [headers, setHeaders] = useState({});

  useEffect(() => {
    const fetchHeaders = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          const headers = {
            'Authorization': `Bearer ${token}`
          };
          setHeaders(headers);
        } catch (error) {
          console.error('Error al obtener el token de acceso:', error);
        }
      }
    };

    fetchHeaders();
  }, [getAccessTokenSilently, isAuthenticated]);

  return headers;
};

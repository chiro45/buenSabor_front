import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import jwt_decode from 'jwt-decode';

const useUserRole = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [rol, setRol] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = await getAccessTokenSilently();
        const decodedToken: any = jwt_decode(token);
        const roles:any = {
          cocinero: 'COCINERO',
          delivery: 'DELIVERY',
          cajero: 'CAJERO',
          cliente: 'CLIENTE', 
          admin: 'ADMIN', 
        };

        const permissions = decodedToken.permissions;

        for (const role in roles) {
          if (permissions.includes(role.toUpperCase())) {
            setRol(roles[role]); // Asigna el rol encontrado al estado 'rol'
            setLoading(false);
            return;
          }
        }

        setRol('ROL INVALIDO');
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener el rol:', error);
        setRol('ERROR');
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [getAccessTokenSilently]);

  return { rol, loading };
};

export default useUserRole;

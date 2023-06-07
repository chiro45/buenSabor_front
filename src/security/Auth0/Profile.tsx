import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const urlPostUsuario = `${import.meta.env.VITE_URL_API}/clientes`

  if (isLoading) {
    return <div >Loading ...</div>;
  }
  useEffect(() => {
    const getIdToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          const decodedToken: any = jwt_decode(token);
          const userId = decodedToken.sub.split('|').pop(); // ID del usuario
          console.log("user id", userId);
          const issuer = decodedToken.sub;

          const isGoogleLogin = issuer.includes('google');
          console.log("Is Google login:", isGoogleLogin);
          const userPost = {
            idAuth0: userId,
            nombre: user?.given_name,
            apellido: user?.family_name,
            email: user?.email,
            usuario: {
              idAuth0: userId,
              usuario: user?.name
            }
          }
          console.log("user post", userPost)
          const headers = {
              'Authorization': `Bearer ${token}`
          };



          const res = await axios.post(urlPostUsuario,userPost,{headers});
          console.log("res", res);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getIdToken();
  }, [isAuthenticated, getAccessTokenSilently]);



  const userN: any = user;
  return isAuthenticated ? (
    <div >
      <button onClick={() => { console.log("MOSTRANDO USAR", user) }}>Mostrar user</button>
      <img src={userN.picture} alt={userN.name} />
      <h2 >{userN.name}</h2>
      <p>{userN.email}</p>
    </div>
  ) : (
    <div >
      Presiona Log In para ver información de tu perfil.
    </div>
  );
};

export default Profile;

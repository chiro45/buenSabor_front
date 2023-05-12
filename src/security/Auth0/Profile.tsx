import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();


  if (isLoading) {
    return <div >Loading ...</div>;
  }
  const userN:any = user;
  return isAuthenticated ? (
    <div >
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

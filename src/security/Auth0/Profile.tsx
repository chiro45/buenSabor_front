import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const userN: any = user;
  return isAuthenticated ? (
    <div >
      <button onClick={() => { console.log("MOSTRANDO USER", user) }}>Mostrar user</button>
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

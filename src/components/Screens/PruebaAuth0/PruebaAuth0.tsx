import Profile from '../../../security/Auth0/Profile'
import { Header, NavBarMobile } from '../../ui'
import './ProfilePage.css'
export const PruebaAuth0 = () => {
  return (
    <div className='containerPrincipal'> 
      <Header/>
      <Profile />
      {/* <ProtectedApiCall />
      <PublicApiCall />
      <AdminApiCall /> */}
    </div>
  )
}

import Profile from '../../ui/Profile/Profile'
import { Header, NavBarMobile } from '../../ui'
import './ProfilePage.css'
export const ProfilePage = () => {
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

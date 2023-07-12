import Profile from '../../../security/Auth0/Profile'
import AdminApiCall from '../../../security/TestApiCalls/AdminApiCall'
import ProtectedApiCall from '../../../security/TestApiCalls/ProtectedApiCall'
import PublicApiCall from '../../../security/TestApiCalls/PublicApiCall'
import { Header } from '../../ui'
import DropdownLogin from '../../ui/DropdownLogin/DropdownLogin'

export const PruebaAuth0 = () => {
  return (
    <div>
      <Header/>
      <Profile />
      <ProtectedApiCall />
      <PublicApiCall />
      <AdminApiCall />
      <DropdownLogin/>
    </div>
  )
}

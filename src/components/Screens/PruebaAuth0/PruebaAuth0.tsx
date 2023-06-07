import React from 'react'
import LoginButton from '../../../security/Auth0/LoginButton'
import LogoutButton from '../../../security/Auth0/LogoutButton'
import Profile from '../../../security/Auth0/Profile'
import AdminApiCall from '../../../security/TestApiCalls/AdminApiCall'
import ProtectedApiCall from '../../../security/TestApiCalls/ProtectedApiCall'
import PublicApiCall from '../../../security/TestApiCalls/PublicApiCall'

export const PruebaAuth0 = () => {
  return (
    <div>
      <LoginButton />
      <LogoutButton />
      <Profile />
      <ProtectedApiCall />
      <PublicApiCall />
      <AdminApiCall />
    </div>
  )
}

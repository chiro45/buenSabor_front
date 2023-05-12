import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AppRoutes } from './routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'
// import Auth0ProviderWithHistory from './security/Auth0/Auth0ProviderWithHistory'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>
    {/* <Auth0ProviderWithHistory> */}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    {/* </Auth0ProviderWithHistory> */}
  </React.StrictMode>,
)

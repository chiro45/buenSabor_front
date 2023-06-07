import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes/AppRoutes"
import { Provider } from "react-redux"
import { store } from "./Redux/store/store"
import Auth0ProviderWithHistory from "./security/Auth0/Auth0ProviderWithHistory"


export const BuenSaborApp = () => {
    return (
        <>
            <Auth0ProviderWithHistory>
                <BrowserRouter >
                    <Provider store={store}>
                        <AppRoutes />
                    </Provider>
                </BrowserRouter >
            </Auth0ProviderWithHistory>
        </>
    )
}

import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes/AppRoutes"
import { Provider } from "react-redux"
import { store } from "./Redux/store/store"
import { buscar_nombre_prod, getItem } from "./functions/functions"


export const BuenSaborApp = () => {
    return (
        <>
            {/* <Auth0ProviderWithHistory> */}
            <BrowserRouter >
                <Provider store={store}>
                    <AppRoutes />
                </Provider>
            </BrowserRouter >
            {/* </Auth0ProviderWithHistory> */}
        </>
    )
}

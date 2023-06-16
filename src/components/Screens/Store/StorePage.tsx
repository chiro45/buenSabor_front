
import { NavBarMobile } from "../../ui"

import './StorePage.css'
import { HeaderStore } from "./HeaderStore/HeaderStore"
import { FiltrosStore } from "./FiltrosStore/FiltrosStore"
import { ProductStore } from "./ProductStore/ProductStore"
import { Footer } from "../../ui/Footer/Footer"
import { PaginationButtons } from "./PaginationButtons/PaginationButtons"

export const StorePage = () => {

    return (
        <div className="containerPrincipal__storePage">
            <HeaderStore />
            <FiltrosStore />
            <div style={{ height: "1vh", width: '100%', backgroundColor: "var(--terciario)" }}></div>
            <ProductStore />
            <div style={{ height: "1vh", width: '100%', backgroundColor: "var(--terciario)" }}></div>
            <PaginationButtons page={1} totalPages={9} />
            <Footer />
            <NavBarMobile />
        </div>
    )
}

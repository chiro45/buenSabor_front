import { useEffect, useState } from "react"
import { Banner } from "../../ui/Banner/Banner"
import { CategoryList } from "../../ui/CategoryList/CategoryList"
import { Footer } from "../../ui/Footer/Footer"
import { Header } from "../../ui/Header/Header"
import { NavBarMobile } from "../../ui/NavBarMobile/NavBarMobile"
import { ProductFavorities } from "../../ui/ProductFavorities/ProductFavorities"
import "./Landing.css"

import { IArticuloManufacturado } from "../../../interfaces"

const URLBASE = 'http://localhost:9000/articulos_manufacturado/pagedPrice/0/default'
interface InterfaceFiltre {
    content: IArticuloManufacturado[]
}
export const Landing = () => {
    const [bannerItem, setBannerItem] = useState<InterfaceFiltre>()
    const [hamburguesas, sethamburguesas] = useState<InterfaceFiltre>()
    const [pizzas, setPizzas] = useState<InterfaceFiltre>()
    const [papas, setPapas] = useState<InterfaceFiltre>()
    const handleElements = async (param: string, setState: Function) => {
        fetch(`${URLBASE}/${param}`)
            .then(response => response.json())
            .then(data => setState(data))
    }

    useEffect(() => {
        handleElements('Hamburguesas', setBannerItem)
        handleElements('papas', setPapas)
        handleElements('Hamburguesas', sethamburguesas)
        handleElements('pizzas', setPizzas)
    }, [])
    return (
        <div className="containerPrincipal__Landing">
            <Header />
            <CategoryList />
            {
                bannerItem &&
                <>
                    <Banner bannerItem={bannerItem.content[0]} />
                </>
            }
            <div className="containerItems__landing">
                {
                    pizzas &&
                    <ProductFavorities
                        categoryName={'pizzas'}
                        nameCategory={'Pizzas'}
                        productFav={pizzas.content} />
                }

                {
                    hamburguesas &&
                    <ProductFavorities
                        categoryName={'Hamburguesas'}
                        nameCategory={'Hamburguesas'}
                        productFav={hamburguesas.content} />
                }

                {
                    papas &&
                    <ProductFavorities
                        categoryName={'papas'}
                        nameCategory={'Papas'}
                        productFav={papas.content} />

                }
            </div>
            <Footer />
            <NavBarMobile />
        </div>
    )
}

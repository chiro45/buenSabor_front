import { CategoryList } from "../../CategoryList/CategoryList"
import { Banner } from "../../ui/Banner/Banner"
import { Header } from "../../ui/Header/Header"
import { NavBarMobile } from "../../ui/NavBarMobile/NavBarMobile"
import { ProductFavorities } from "../../ui/ProductFavorities/ProductFavorities"
import "./Landing.css"

const bannerItem = {
    id: "idProduct",
    name: "DOBLE CHEESE BURGER",
    price: 1900,
    url: "https://www.pngall.com/wp-content/uploads/2016/05/Burger-PNG-Image.png"
}

const initial = {
    nameCategory: "Hamburguesas",
    urlViewAll: "",
    arrItems: [
        {
            id: "idProduct",
            name: "DOBLE CHEESE BURGER",
            price: 1900,
            url: "https://www.pngall.com/wp-content/uploads/2016/05/Burger-PNG-Image.png"

        }, {
            id: "idProduct",
            name: "DOBLE CON PALTA",
            price: 2500,
            url: "https://www.pngmart.com/files/5/Hamburger-PNG-Clipart.png"
        }, {
            id: "idProduct",
            name: "AMERICAN BURGUER",
            price: 2600,
            url: "https://www.pngkit.com/png/full/107-1073803_hamburguesa-doble-carne-png.png"
        }
    ],
}
const initial2 = {
    nameCategory: "Papas",
    urlViewAll: "",
    arrItems: [
        {
            id: "idProduct",
            name: "PAPAS CLASICAS",
            price: 1900,
            url: "https://static.vecteezy.com/system/resources/previews/013/442/155/original/crispy-and-delicious-french-fries-free-png.png"

        }, {
            id: "idProduct",
            name: "PAPAS CHEDDAR",
            price: 2500,
            url: "https://s3-eu-central-1.amazonaws.com/www.burgerking.com.ar.v2/wp-media-folder-burger-king-argentina//home/ubuntu/preview/menu-app/frontend/apps/marketing-website-wordpress-app/web/app/uploads/sites/5/Papas-Cheddar.png"
        }, {
            id: "idProduct",
            name: "PAPAS CHEDDAR Y PANCETA",
            price: 2600,
            url: "https://s3-eu-central-1.amazonaws.com/www.burgerking.com.ar.v2/wp-media-folder-burger-king-argentina//home/ubuntu/preview/menu-app/frontend/apps/marketing-website-wordpress-app/web/app/uploads/sites/5/Papas-Cheddar.png"
        }
    ]
}
const initial3 = {
    nameCategory: "BEBIDAS",
    urlViewAll: "",
    arrItems: [
        {
            id: "idProduct",
            name: "COCACOLA",
            price: 1900,
            url: "https://www.pasosonline.com.ar/wp-content/uploads/2018/09/image-removebg-preview-75.png"

        },
        {
            id: "idProduct",
            name: "COCACOLA",
            price: 1900,
            url: "https://www.pasosonline.com.ar/wp-content/uploads/2018/09/image-removebg-preview-75.png"

        },
        {
            id: "idProduct",
            name: "COCACOLA",
            price: 1900,
            url: "https://www.pasosonline.com.ar/wp-content/uploads/2018/09/image-removebg-preview-75.png"

        }
    ]
}
export const Landing = () => {
    return (
        <div className="containerPrincipal__Landing">
            <Header />
            <CategoryList />
            <Banner bannerItem={bannerItem} />
            <div className="containerItems__landing">
                <ProductFavorities productFav={initial} />
                <ProductFavorities productFav={initial2} />
                <ProductFavorities productFav={initial3} />
            </div>
            <NavBarMobile />
        </div>
    )
}

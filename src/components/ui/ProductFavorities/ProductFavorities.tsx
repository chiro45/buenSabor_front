import { useNavigate } from "react-router-dom"
import { CardItem } from "../CardItem/CardItem"
import "./ProductFavorities.css"
import { IArticuloManufacturado } from "../../../interfaces"
import { addCategoryActive } from "../../../Redux/Reducers/StoreProductReducers/StoreProductReducer"
import { useDispatch } from "react-redux"


export const ProductFavorities = ({
    categoryName,
    nameCategory,
    productFav
}: {
    categoryName: string
    nameCategory: string,
    productFav: IArticuloManufacturado[]
}) => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    
    const handleStoreCategory = () => {
        dispatch(addCategoryActive(categoryName))
        navigate('/store')
    }
    
    return (
        <div className="containerPrincipal__productFavorities">
            <div className="productFavorities__containerItems">
                <div className="productFavorities__titleAndAction">
                    <h4>{nameCategory}</h4>
                    <button
                        onClick={() => {
                            handleStoreCategory()
                        }}
                        className="productFavorities__buttonViewAll">Ver todos</button>
                </div>
                <div className="productFavorities__cardItemsContainer">
                    {
                        productFav !== undefined &&
                        productFav.map((el: IArticuloManufacturado, i: number) => (
                            <CardItem key={i} item={el} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

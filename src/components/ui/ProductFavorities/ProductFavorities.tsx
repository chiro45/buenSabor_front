import { CardItem } from "../CardItem/CardItem"
import "./ProductFavorities.css"


export const ProductFavorities = ({ productFav }:any) => {
    const { nameCategory, urlViewAll, arrItems } = productFav
    return (
        <div className="containerPrincipal__productFavorities">
            <div className="productFavorities__containerItems">
                <div className="productFavorities__titleAndAction">
                    <h4>{nameCategory}</h4>
                    <button
                        onClick={() => {
                            console.log(urlViewAll)
                        }}
                        className="productFavorities__buttonViewAll">Ver todos</button>
                </div>
                <div className="productFavorities__cardItemsContainer">
                    {
                        arrItems !== undefined &&
                        arrItems.map((el:any, i:number) => (
                            <CardItem key={i} item={el}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

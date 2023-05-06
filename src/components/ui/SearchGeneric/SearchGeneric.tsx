
import { FunctionComponent } from "react"
import "./SearchGeneric.css"
interface ISearchGeneric {
    label: string,
    placeholder: string

}
export const SearchGeneric: FunctionComponent<ISearchGeneric> = ({ label, placeholder }) => {
    return (
            <div className="containerPrincipalSearchGeneric">
                <div className="containerItemsSearchGeneric">
                    <div className="containerElementSearchGeneric">
                        <label className="labelSearchGeneric">{label}</label>
                    </div>
                    <div className="containerElementSearchGeneric">
                        <input className="inputSearchGeneric" type="text" placeholder={placeholder} /></div>
                    <div className="containerElementSearchGeneric">
                        <button className="buttonSearchGeneric">Buscar</button>
                    </div>
                </div>
            </div>
    )
}

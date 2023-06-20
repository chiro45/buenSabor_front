import { fetchGet } from "../../../helpers";
import { IArticuloManufacturado } from "../../../interfaces";
import { TypesStoreProductReducer } from "../../Types/TypesStoreProductReducer";
import { IActionStoreProductsReducer, IProductReducer } from "./IStoreProductReducer";

// Definimos el estado inicial
const initialState: IProductReducer = {
    productStore: [],
    productActive: null,
    busqueda: ""
};

// Creamos el reducer de los modales
export const StoreProductReducer = (state = initialState, action: IActionStoreProductsReducer) => {
    switch (action.type) {
        case TypesStoreProductReducer.addProductsStore:
            return {
                ...state,
                productStore: action.payload
            }
        case TypesStoreProductReducer.removeProductsStore:
            return {
                productStore: [],
                productActive: null
            }
        case TypesStoreProductReducer.addProducActive:
            return {
                ...state,
                productActive: action.payload
            }
        case TypesStoreProductReducer.removeProductActive:
            return {
                ...state,
                productActive: null
            }
        default:
            return state;
    }
};

export const startAddProductStore = (url: string, headers: Record<string, string>): any => {
    return async (dispatch: any): Promise<void> => {
        try {
            const respuesta = await fetchGet(url, headers);
            // Cuando se recibe la respuesta, se llama a la función addDataTable para agregar los datos a la tabla
            dispatch(addProducsStore(respuesta));
        } catch (error) {
            console.error(error);
        }
    };
}

const addProducsStore = (data: IArticuloManufacturado[]) => ({
    type: TypesStoreProductReducer.addProductsStore,
    payload: data
})

export const removeProductStore = () => ({
    type: TypesStoreProductReducer.removeProductsStore
})

export const startAddProductActive = (url: string, id: number, headers: Record<string, string>): any => {
    return async (dispatch: any): Promise<void> => {
        try {
            const respuesta = await fetchGet(`${url}/${id}`, headers);
            // Cuando se recibe la respuesta, se llama a la función addDataTable para agregar los datos a la tabla
            console.log(respuesta)
            dispatch(addProductActive(respuesta));
        } catch (error) {
            console.error(error);
        }
    }
}

const addProductActive = (data: IArticuloManufacturado) => ({
    type: TypesStoreProductReducer.addProducActive,
    payload: data
})

export const removeProductActive = () => ({
    type: TypesStoreProductReducer.removeProductActive
})




import { fetchGet } from "../../../helpers";
import { IArticuloManufacturado } from "../../../interfaces";
import { TypesStoreProductReducer } from "../../Types/TypesStoreProductReducer";
import { IActionStoreProductsReducer, IApiResponse, IProductReducer } from "./IStoreProductReducer";

// Definimos el estado inicial
export const initialState: IProductReducer = {
    productStore: [],
    productActive: null,
    busqueda: "",
    categoriaActiva: "",
    orderPriceActive: "",
};

// Creamos el reducer de los modales
export const StoreProductReducer = (state = initialState, action: IActionStoreProductsReducer) => {
    switch (action.type) {
        case TypesStoreProductReducer.addProductsStore:
            return {
                ...state,
                productStore: action.payload?.content,
                totalPages: action.payload?.totalPages,
            }
        case TypesStoreProductReducer.removeProductsStore:
            return {
                productStore: [],
                productActive: null,
                busqueda: "",
                categoriaActiva: "",
                orderPriceActive: ""
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
        case TypesStoreProductReducer.addSearch:
            return {
                ...state,
                busqueda: action.payload
            }
        case TypesStoreProductReducer.removeSearch:
            return {
                ...state,
                categoriaActiva: "",
                busqueda: "",
                orderPriceActive: ""
            }
        case TypesStoreProductReducer.addCategoryActive:
            return {
                ...state,
                busqueda: "",
                categoriaActiva: action.payload,
            }
        case TypesStoreProductReducer.addOrderPriceActive:
            return {
                ...state,
                busqueda: "",
                orderPriceActive: action.payload,
            }
        case TypesStoreProductReducer.removeCategoryActive:
            return {
                ...state,
                categoriaActiva: "",
                orderPriceActive: ""
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

export const addProducsStore = (data: IApiResponse) => ({
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
export const addSearchActive = (search: string) => ({
    type: TypesStoreProductReducer.addSearch,
    payload: search
})

export const removeSearchActive = () => ({
    type: TypesStoreProductReducer.removeSearch
})
export const addCategoryActive = (search: string) => ({
    type: TypesStoreProductReducer.addCategoryActive,
    payload: search
})
export const addOrderPriceActive = (search: string) => ({
    type: TypesStoreProductReducer.addOrderPriceActive,
    payload: search
})

export const removeCategoryActive = () => ({
    type: TypesStoreProductReducer.removeCategoryActive
})




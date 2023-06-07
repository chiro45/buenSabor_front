import { fetchGet, fetchPost, fetchPut } from "../fetchFunctions";

export const createElement = async (urlFetch:string,data: any, headers: Record<string, string>) => {
    try {
        await fetchPost(urlFetch, data, headers);
    } catch (error) {
        console.error('Error al crear el elemento:', error);
        throw new Error('Error al crear el elemento');
    }
};

export const updateElement = async (urlFetch:string,id: number, data: any, headers: Record<string, string>) => {
    try {
        await fetchPut(`${urlFetch}/${id}`, data, headers);
    } catch (error) {
        console.error('Error al actualizar el elemento:', error);
        throw new Error('Error al crear el elemento');
    }
};

export const getElementSetState = async (urlFetch:string,headers: Record<string, string>, setState:any) => {
    try {
    await fetchGet(urlFetch,headers)
        .then((response) => { setState(response) })
        .catch((error) => console.error(error))
    } catch (error) {
        console.error('Error al setear el elemento:', error);
        throw new Error('Error al setear el elemento');
    }
};
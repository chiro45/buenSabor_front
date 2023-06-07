import { fetchPost, fetchPut } from "../fetchFunctions";

export const createElement = async (urlFetch:string,data: any, headers: any) => {
    try {
        await fetchPost(urlFetch, data, headers);
    } catch (error) {
        console.error('Error al crear el elemento:', error);
        throw new Error('Error al crear el elemento');
    }
};

export const updateElement = async (urlFetch:string,id: number, data: any, headers: any) => {
    try {
        await fetchPut(`${urlFetch}/${id}`, data, headers);
    } catch (error) {
        console.error('Error al actualizar el elemento:', error);
        throw new Error('Error al crear el elemento');
    }
};

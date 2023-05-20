import axios from "axios";
let URL:string  = "http://localhost:9000/"; //UNIDAD DE MEDIDA
export const getItem = async <T>(item:string) : Promise<T>=> {
    try {
      const response = await axios.get(URL+item);
      console.log(URL+item)
      const data: T = response.data;
      return data;
    } catch (err:any) {
      throw new Error(err.message);
    }
  };

export const buscar_nombre_prod = (string_busqueda:string) => {
  const url = `http://localhost:9000/productos/buscar_nombre/${encodeURIComponent(string_busqueda)}`;
  return axios.get(url)
    .then(response => {
      console.log("Hola");
      console.log(response.data);
      return response.data;
    });
};

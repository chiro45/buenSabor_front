import axios from "axios";

export const fetchPut = async (urlPut: string, putData: any, headers:Record<string, string>) => {
    try {
      const res = await axios.put(urlPut, putData, {headers});
      const data = res.data;
      return data;
    } catch (e) {
      console.log(e);
      throw new Error('Failed to fetch put: ' + e);
    }
  };
  
//   import { fetchPut } from './archivoDondeSeEncuentraLaFuncion';

// const url = 'https://api.example.com/put'; // URL de la API a la que deseas realizar la solicitud PUT
// const putData = {
//   name: 'John Doe',
//   email: 'johndoe@example.com'
// }; // Datos que deseas enviar en la solicitud PUT

// // Llamada a la función fetchPut
// fetchPut(url, putData)
//   .then(response => {
//     console.log('Respuesta:', response);
//     // Realizar acciones adicionales con la respuesta de la solicitud PUT
//   })
//   .catch(error => {
//     console.error('Error:', error);
//     // Manejar el error de la solicitud PUT
//   });


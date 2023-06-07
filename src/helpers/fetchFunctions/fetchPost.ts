import axios from "axios";

export const fetchPost = async (urlPost: string, postData: any, headers:Record<string, string>) => {
    try {
      const res = await axios.post(urlPost, postData,{headers});
      const data = res.data;
      return data;
    } catch (e) {
      console.log(e);
      throw new Error('Failed to fetch post: ' + e);
    }
  };

  



  
//   Ejemplo de uso
//   import { fetchPost } from './archivoDondeSeEncuentraLaFuncion';

// const url = 'https://api.example.com/post'; // URL de la API a la que deseas realizar la solicitud POST
// const postData = {
//   name: 'John Doe',
//   email: 'johndoe@example.com'
// }; // Datos que deseas enviar en la solicitud POST

// // Llamada a la función fetchPost
// fetchPost(url, postData)
//   .then(response => {
//     console.log('Respuesta:', response);
//     // Realizar acciones adicionales con la respuesta de la solicitud POST
//   })
//   .catch(error => {
//     console.error('Error:', error);
//     // Manejar el error de la solicitud POST
//   });

import axios from "axios";

import Swal from "sweetalert2";

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
//tenemos la funcion que nos ayuda a enviar la foto a  cloudinary


export const fileUpload = async (file:File)=>{

    const cloudUrl = ' https://api.cloudinary.com/v1_1/dka1fqaps/upload'
    
    const formData = new FormData(); // permite compilar un conjunto de pares clave/valor para enviar mediante XMLHttpRequest
    formData.append('upload_preset','react-journal') // esto va en la url
    formData.append('file',file)    //  mas datos de la url y el file 
    
    try{
        //realizamos el fetch y le mandamos el metodo y el formData
        const respuesta = await fetch(cloudUrl,{
            method: 'POST',
            body: formData
        })
        // si respuesta da el ok o status 200 esta todo okey
        if(respuesta.ok){
            const cloudResp =  await respuesta.json();// esperamos la respuesta de cloudinary
            return cloudResp.secure_url;
        }else{
            throw  await respuesta.json();
        }

    }catch(error){
        console.error(error)
    }
        
}
export const startUploading = async(file:File,setImageProduct:Function) =>{
        Swal.fire({
            title: 'Subiendo...',
            text: 'Por Favor Espere...',
            allowOutsideClick: false,
            didOpen:()=>{
                Swal.showLoading()
            } 
        });       
        const fileUrl = await fileUpload(file)
        setImageProduct({image: fileUrl})
        Swal.close();
       return fileUrl
        
}
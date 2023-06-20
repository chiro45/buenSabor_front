import Swal from "sweetalert2";

//Funcion para la alerta cuando ocurre un error
export const alertError = (message:string,title:string)=>{
    Swal.fire({
        icon: 'error',
        title: title,
        text: message
      })
}
// Funcion para alerta cuando queramos confirmar algo
export const alertConfirm = (message:string,
                            title:string,
                            mensaje_confirm:string,
                            action:Function,
                            mensaje_cancel:string = "Cancelar"
                            )=>{
    Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: mensaje_confirm,
        cancelButtonText: mensaje_cancel
    }).then((result) => {
        if (result.isConfirmed) {
               action()
        }
    })
}
// Funcion para confirmacion
export const alertSuccess = (message:string,title:string)=>{
    Swal.fire({
        icon: 'success',
        title: title,
        text: message
      })
}
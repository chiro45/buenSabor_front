import { IDomicilio, IUsuario } from ".";

export interface ICliente {
    id: number;
    nombre: string;
    apellido: string;
    telefono: number;
    email: string;
    domicilio: IDomicilio;
    usuario: IUsuario;
}
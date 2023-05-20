import { ICategoria } from "../entidades";


export const IColumnsCategoria = [
    { label: 'Denominacion', key: 'denominacion' },
    { label: "Categoria Padre", key: "parent", render: (parent: ICategoria) => parent !== null ? parent.denominacion : "Padre" },
    {
        label: 'Alta/Baja',
        key: 'altaBaja',
        render: (altaBajaT: boolean) => (altaBajaT ? 'Alta' : 'Baja'),
    },
];

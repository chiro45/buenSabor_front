import { Categoria } from "../entidades";


export const ColumnsCategoria = [
    { label: 'Denominacion', key: 'denominacion' },
    { label: "Categoria Padre", key: "parent", render: (parent: Categoria) => parent !== null ? parent.denominacion : "Padre" },
    {
        label: 'Alta/Baja',
        key: 'altaBaja',
        render: (altaBajaT: boolean) => (altaBajaT ? 'Alta' : 'Baja'),
    },
];

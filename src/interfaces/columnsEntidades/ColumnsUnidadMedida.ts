
export const ColumnsUnidadMedida = [
    { label: 'Denominacion', key: 'denominacion' },
    { label: 'Tipo', key: 'tipo' },
    {
        label: 'Alta/Baja',
        key: 'altaBaja',
        render: (altaBajaT: boolean) => altaBajaT === true ? 'Alta' : 'Baja',
    },
];

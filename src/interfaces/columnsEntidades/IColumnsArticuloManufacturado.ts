import { ICategoria } from "../entidades";


export const IColumnsArticuloManufacturado = [
    { label: 'Denominación', key: 'denominacion' },
    { label: 'Descripcion', key: 'descripcion' },
    { label: 'Precio Venta', key: 'precioVenta' },
    { label: 'Tiempo Preparacion', key: 'tiempoEstimadoCocina' },
    { label: 'Receta', key: 'receta' },
    {
        label: 'Alta/Baja',
        key: 'altaBaja',
        render: (altaBajaT: boolean) => (altaBajaT ? 'Alta' : 'Baja'),
    },
    {
        label: 'Producto Final',
        key: 'productoFinal',
        render: (altaBajaT: boolean) => (altaBajaT ? 'Producto Final' : 'Producto con Ingredientes'),
    },
    { label: 'Categoria', key: 'categoria', render: (categoria: ICategoria) => categoria.denominacion },
    
];
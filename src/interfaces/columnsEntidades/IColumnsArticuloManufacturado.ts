import { ICategoria } from "../entidades";


export const IColumnsArticuloManufacturado = [
    { label: 'Denominación', key: 'denominacion' },
    { label: 'Descripcion', key: 'descripcion',render: (denominacion: string) => (denominacion.slice(0,15)) },
    { label: 'Precio Compra', key: 'precioCompra' },
    { label: 'Precio Venta', key: 'precioVenta' },
    { label: 'Tiempo Preparacion', key: 'tiempoEstimadoCocina' },
    { label: 'Receta', key: "receta",render: (denominacion: string) => (denominacion.slice(0,15)) },
    { label: 'Stock Actual', key: 'stockActual' },
    { label: 'Stock Mínimo', key: 'stockMinimo' },
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
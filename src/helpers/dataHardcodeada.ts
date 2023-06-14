import { IArticuloManufacturado } from "../interfaces";

export const dataHardcodeada: IArticuloManufacturado[] = [
    {
        id: 1,
        tipoClase: "ArticuloManufacturado",
        tiempoEstimadoCocina: 120,
        productoFinal: false,
        denominacion: "Pizza Margarita",
        descripcion: "Deliciosa pizza con tomate, mozzarella y albahaca",
        receta: "Mezclar los ingredientes y hornear a alta temperatura",
        precioVenta: 2500.0,
        imagen: "https://www.pngall.com/wp-content/uploads/2016/05/Burger-PNG-Image.png",
        altaBaja: true,
        detalleArticuloManufacturados: [
            {
                id: 1,
                tipoClase: "DetalleArticuloManufacturado",
                cantidad: 200,
                articuloInsumo: {
                    id: 1,
                    tipoClase: "ArticuloInsumo",
                    denominacion: "Tomate",
                    precioCompra: 500.0,
                    precioVenta: 800.0,
                    stockActual: 1000.0,
                    stockMinimo: 200.0,
                    altaBaja: false,
                    categoria: {
                        id: 2,
                        tipoClase: "Categoria",
                        denominacion: "Verduras",
                        altaBaja: true,
                        parent: {
                            id: 1,
                            tipoClase: "Categoria",
                            denominacion: "Alimentos",
                            altaBaja: true,
                            parent: null
                        }
                    },
                    unidadMedida: {
                        id: 1,
                        tipoClase: "UnidadMedida",
                        denominacion: "Gramos",
                        tipo: "gr",
                        altaBaja: true
                    }
                }
            },
            {
                id: 2,
                tipoClase: "DetalleArticuloManufacturado",
                cantidad: 3,
                articuloInsumo: {
                    id: 2,
                    tipoClase: "ArticuloInsumo",
                    denominacion: "Mozzarella",
                    precioCompra: 800.0,
                    precioVenta: 1200.0,
                    stockActual: 500.0,
                    stockMinimo: 100.0,
                    altaBaja: false,
                    categoria: {
                        id: 3,
                        tipoClase: "Categoria",
                        denominacion: "Lácteos",
                        altaBaja: true,
                        parent: {
                            id: 1,
                            tipoClase: "Categoria",
                            denominacion: "Alimentos",
                            altaBaja: true,
                            parent: null
                        }
                    },
                    unidadMedida: {
                        id: 1,
                        tipoClase: "UnidadMedida",
                        denominacion: "Gramos",
                        tipo: "gr",
                        altaBaja: true
                    }
                }
            }
        ],
        categoria: {
            id: 1,
            tipoClase: "Categoria",
            denominacion: "Alimentos",
            altaBaja: true,
            parent: null
        }
    },
    {
        id: 2,
        tipoClase: "ArticuloManufacturado",
        tiempoEstimadoCocina: 90,
        productoFinal: false,
        denominacion: "Ensalada César",
        descripcion: "Ensalada fresca con lechuga, pollo, crutones y aderezo César",
        receta: "Mezclar los ingredientes y añadir aderezo al gusto",
        precioVenta: 1800.0,
        imagen: "https://www.pngmart.com/files/5/Hamburger-PNG-Clipart.png",
        altaBaja: true,
        detalleArticuloManufacturados: [
            {
                id: 3,
                tipoClase: "DetalleArticuloManufacturado",
                cantidad: 150,
                articuloInsumo: {
                    id: 3,
                    tipoClase: "ArticuloInsumo",
                    denominacion: "Lechuga",
                    precioCompra: 300.0,
                    precioVenta: 600.0,
                    stockActual: 200.0,
                    stockMinimo: 50.0,
                    altaBaja: false,
                    categoria: {
                        id: 2,
                        tipoClase: "Categoria",
                        denominacion: "Verduras",
                        altaBaja: true,
                        parent: {
                            id: 1,
                            tipoClase: "Categoria",
                            denominacion: "Alimentos",
                            altaBaja: true,
                            parent: null
                        }
                    },
                    unidadMedida: {
                        id: 1,
                        tipoClase: "UnidadMedida",
                        denominacion: "Gramos",
                        tipo: "gr",
                        altaBaja: true
                    }
                }
            },
            {
                id: 4,
                tipoClase: "DetalleArticuloManufacturado",
                cantidad: 2,
                articuloInsumo: {
                    id: 4,
                    tipoClase: "ArticuloInsumo",
                    denominacion: "Pollo",
                    precioCompra: 1200.0,
                    precioVenta: 1800.0,
                    stockActual: 300.0,
                    stockMinimo: 100.0,
                    altaBaja: false,
                    categoria: {
                        id: 4,
                        tipoClase: "Categoria",
                        denominacion: "Carnes Blancas",
                        altaBaja: true,
                        parent: {
                            id: 1,
                            tipoClase: "Categoria",
                            denominacion: "Alimentos",
                            altaBaja: true,
                            parent: null
                        }
                    },
                    unidadMedida: {
                        id: 1,
                        tipoClase: "UnidadMedida",
                        denominacion: "Gramos",
                        tipo: "gr",
                        altaBaja: true
                    }
                }
            }
        ],
        categoria: {
            id: 1,
            tipoClase: "Categoria",
            denominacion: "Alimentos",
            altaBaja: true,
            parent: null
        }
    },
    {
        id: 3,
        tipoClase: "ArticuloManufacturado",
        tiempoEstimadoCocina: 60,
        productoFinal: false,
        denominacion: "Sushi",
        descripcion: "Rolls de sushi variados con ingredientes frescos",
        receta: "Preparar arroz, rellenar con ingredientes y enrollar con alga nori",
        precioVenta: 3500.0,
        imagen: "https://www.pngkit.com/png/full/107-1073803_hamburguesa-doble-carne-png.png",
        altaBaja: true,
        detalleArticuloManufacturados: [
            {
                id: 5,
                tipoClase: "DetalleArticuloManufacturado",
                cantidad: 200,
                articuloInsumo: {
                    id: 5,
                    tipoClase: "ArticuloInsumo",
                    denominacion: "Arroz",
                    precioCompra: 500.0,
                    precioVenta: 800.0,
                    stockActual: 300.0,
                    stockMinimo: 100.0,
                    altaBaja: false,
                    categoria: {
                        id: 5,
                        tipoClase: "Categoria",
                        denominacion: "Cereales",
                        altaBaja: true,
                        parent: {
                            id: 1,
                            tipoClase: "Categoria",
                            denominacion: "Alimentos",
                            altaBaja: true,
                            parent: null
                        }
                    },
                    unidadMedida: {
                        id: 1,
                        tipoClase: "UnidadMedida",
                        denominacion: "Gramos",
                        tipo: "gr",
                        altaBaja: true
                    }
                }
            },
            {
                id: 6,
                tipoClase: "DetalleArticuloManufacturado",
                cantidad: 4,
                articuloInsumo: {
                    id: 6,
                    tipoClase: "ArticuloInsumo",
                    denominacion: "Salmón",
                    precioCompra: 2000.0,
                    precioVenta: 3000.0,
                    stockActual: 100.0,
                    stockMinimo: 20.0,
                    altaBaja: false,
                    categoria: {
                        id: 4,
                        tipoClase: "Categoria",
                        denominacion: "Carnes Blancas",
                        altaBaja: true,
                        parent: {
                            id: 1,
                            tipoClase: "Categoria",
                            denominacion: "Alimentos",
                            altaBaja: true,
                            parent: null
                        }
                    },
                    unidadMedida: {
                        id: 1,
                        tipoClase: "UnidadMedida",
                        denominacion: "Gramos",
                        tipo: "gr",
                        altaBaja: true
                    }
                }
            }
        ],
        categoria: {
            id: 1,
            tipoClase: "Categoria",
            denominacion: "Alimentos",
            altaBaja: true,
            parent: null
        }
    },
    {
        id: 4,
        tipoClase: "ArticuloManufacturado",
        tiempoEstimadoCocina: 30,
        productoFinal: false,
        denominacion: "Batido de Frutas",
        descripcion: "Refrescante batido con una mezcla de frutas tropicales",
        receta: "Licuar las frutas con hielo y endulzar al gusto",
        precioVenta: 1200.0,
        imagen: "https://www.pngkit.com/png/full/107-1073803_hamburguesa-doble-carne-png.png",
        altaBaja: true,
        detalleArticuloManufacturados: [
            {
                id: 7,
                tipoClase: "DetalleArticuloManufacturado",
                cantidad: 300,
                articuloInsumo: {
                    id: 7,
                    tipoClase: "ArticuloInsumo",
                    denominacion: "Mango",
                    precioCompra: 300.0,
                    precioVenta: 500.0,
                    stockActual: 500.0,
                    stockMinimo: 100.0,
                    altaBaja: false,
                    categoria: {
                        id: 6,
                        tipoClase: "Categoria",
                        denominacion: "Frutas",
                        altaBaja: true,
                        parent: {
                            id: 1,
                            tipoClase: "Categoria",
                            denominacion: "Alimentos",
                            altaBaja: true,
                            parent: null
                        }
                    },
                    unidadMedida: {
                        id: 1,
                        tipoClase: "UnidadMedida",
                        denominacion: "Gramos",
                        tipo: "gr",
                        altaBaja: true
                    }
                }
            },
            {
                id: 8,
                tipoClase: "DetalleArticuloManufacturado",
                cantidad: 2,
                articuloInsumo: {
                    id: 8,
                    tipoClase: "ArticuloInsumo",
                    denominacion: "Piña",
                    precioCompra: 200.0,
                    precioVenta: 400.0,
                    stockActual: 400.0,
                    stockMinimo: 50.0,
                    altaBaja: false,
                    categoria: {
                        id: 6,
                        tipoClase: "Categoria",
                        denominacion: "Frutas",
                        altaBaja: true,
                        parent: {
                            id: 1,
                            tipoClase: "Categoria",
                            denominacion: "Alimentos",
                            altaBaja: true,
                            parent: null
                        }
                    },
                    unidadMedida: {
                        id: 1,
                        tipoClase: "UnidadMedida",
                        denominacion: "Gramos",
                        tipo: "gr",
                        altaBaja: true
                    }
                }
            }
        ],
        categoria: {
            id: 1,
            tipoClase: "Categoria",
            denominacion: "Alimentos",
            altaBaja: true,
            parent: null
        }
    },
    {
        id: 5,
        tipoClase: "ArticuloManufacturado",
        tiempoEstimadoCocina: 45,
        productoFinal: false,
        denominacion: "Tacos",
        descripcion: "Deliciosos tacos con carne, tortillas y salsa",
        receta: "Cocinar la carne, calentar las tortillas y agregar salsa al gusto",
        precioVenta: 1500.0,
        imagen: "https://www.pngkit.com/png/full/107-1073803_hamburguesa-doble-carne-png.png",
        altaBaja: true,
        detalleArticuloManufacturados: [
          {
            id: 9,
            tipoClase: "DetalleArticuloManufacturado",
            cantidad: 200,
            articuloInsumo: {
              id: 9,
              tipoClase: "ArticuloInsumo",
              denominacion: "Carne",
              precioCompra: 1000.0,
              precioVenta: 1500.0,
              stockActual: 500.0,
              stockMinimo: 100.0,
              altaBaja: false,
              categoria: {
                id: 4,
                tipoClase: "Categoria",
                denominacion: "Carnes Blancas",
                altaBaja: true,
                parent: {
                  id: 1,
                  tipoClase: "Categoria",
                  denominacion: "Alimentos",
                  altaBaja: true,
                  parent: null
                }
              },
              unidadMedida: {
                id: 1,
                tipoClase: "UnidadMedida",
                denominacion: "Gramos",
                tipo: "gr",
                altaBaja: true
              }
            }
          },
          {
            id: 10,
            tipoClase: "DetalleArticuloManufacturado",
            cantidad: 4,
            articuloInsumo: {
              id: 10,
              tipoClase: "ArticuloInsumo",
              denominacion: "Tortillas",
              precioCompra: 200.0,
              precioVenta: 400.0,
              stockActual: 300.0,
              stockMinimo: 50.0,
              altaBaja: false,
              categoria: {
                id: 7,
                tipoClase: "Categoria",
                denominacion: "Harinas",
                altaBaja: true,
                parent: {
                  id: 1,
                  tipoClase: "Categoria",
                  denominacion: "Alimentos",
                  altaBaja: true,
                  parent: null
                }
              },
              unidadMedida: {
                id: 1,
                tipoClase: "UnidadMedida",
                denominacion: "Gramos",
                tipo: "gr",
                altaBaja: true
              }
            }
          }
        ],
        categoria: {
          id: 1,
          tipoClase: "Categoria",
          denominacion: "Alimentos",
          altaBaja: true,
          parent: null
        }
      },
      {
        id: 6,
        tipoClase: "ArticuloManufacturado",
        tiempoEstimadoCocina: 45,
        productoFinal: false,
        denominacion: "Tacos",
        descripcion: "Deliciosos tacos con carne, tortillas y salsa",
        receta: "Cocinar la carne, calentar las tortillas y agregar salsa al gusto",
        precioVenta: 1500.0,
        imagen: "https://www.pngkit.com/png/full/107-1073803_hamburguesa-doble-carne-png.png",
        altaBaja: true,
        detalleArticuloManufacturados: [
          {
            id: 9,
            tipoClase: "DetalleArticuloManufacturado",
            cantidad: 200,
            articuloInsumo: {
              id: 9,
              tipoClase: "ArticuloInsumo",
              denominacion: "Carne",
              precioCompra: 1000.0,
              precioVenta: 1500.0,
              stockActual: 500.0,
              stockMinimo: 100.0,
              altaBaja: false,
              categoria: {
                id: 4,
                tipoClase: "Categoria",
                denominacion: "Carnes Blancas",
                altaBaja: true,
                parent: {
                  id: 1,
                  tipoClase: "Categoria",
                  denominacion: "Alimentos",
                  altaBaja: true,
                  parent: null
                }
              },
              unidadMedida: {
                id: 1,
                tipoClase: "UnidadMedida",
                denominacion: "Gramos",
                tipo: "gr",
                altaBaja: true
              }
            }
          },
          {
            id: 10,
            tipoClase: "DetalleArticuloManufacturado",
            cantidad: 4,
            articuloInsumo: {
              id: 10,
              tipoClase: "ArticuloInsumo",
              denominacion: "Tortillas",
              precioCompra: 200.0,
              precioVenta: 400.0,
              stockActual: 300.0,
              stockMinimo: 50.0,
              altaBaja: false,
              categoria: {
                id: 7,
                tipoClase: "Categoria",
                denominacion: "Harinas",
                altaBaja: true,
                parent: {
                  id: 1,
                  tipoClase: "Categoria",
                  denominacion: "Alimentos",
                  altaBaja: true,
                  parent: null
                }
              },
              unidadMedida: {
                id: 1,
                tipoClase: "UnidadMedida",
                denominacion: "Gramos",
                tipo: "gr",
                altaBaja: true
              }
            }
          }
        ],
        categoria: {
          id: 1,
          tipoClase: "Categoria",
          denominacion: "Alimentos",
          altaBaja: true,
          parent: null
        }
      },
];

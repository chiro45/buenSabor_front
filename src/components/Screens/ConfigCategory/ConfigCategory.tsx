
import { TablaGeneric } from "../../TablaGenerica/TablaGeneric"
import { Header } from "../../ui/Header/Header"
import { SearchGeneric } from "../../ui/SearchGeneric/SearchGeneric"
import "./ConfigCategory.css"

export const ConfigCategory = () => {

    const columns = [
        { "label": "Nombre", "width": "150px" },
        { "label": "Edad", "width": 100 },
        { "label": "País" }
    ]
    const data = [
        ["Juan", "25", "España"],
        ["María", "30", "México"],
        ["Carlos", "40", "Argentina"]
    ]

    const data2 = [{
        "id": 1,
        "denominacion": "denominacion_value",
        "esInsumo": true,
        "precioCompra": 10.99,
        "precioVenta": 19.99,
        "stockActual": 100.0,
        "stockMinimo": 50.0,
        "categoria": {
            "id": 5,
            "denominacion": "Example Category Tranquilo",
            "parent": null
        },
        "unidadMedida": {
            "id": 1,
            "tipo": "tipo_value"
        },
        "producto": null
    }]
    
   
    return (
        <div>
            <Header />
            <div style={{ height: "5vh", backgroundColor: "#fea" }}>
                Subheader
            </div>
            <SearchGeneric label={"categoria"} placeholder={"Ingrese su categoria"} />
            <div>
                <button>Agregar Categoria</button>
            </div>

            <TablaGeneric columns={columns} data={data} />
        </div>
    )
}

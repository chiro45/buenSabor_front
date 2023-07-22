
import { useState } from "react";
import { GraficoClientes } from "./GraficoClientes";
import { GraficoProductos } from "./GraficoProductos";
import { Header } from "../../ui";
import { Footer } from "../../ui/Footer/Footer";
import "./Analytics.css"
import { alertError } from "../../../functions/alerts";
const urlClientesProductos = `${import.meta.env.VITE_URL_ANALITICO_CLIENTES_TOP}`

const urlAnaliticasProductos = `${import.meta.env.VITE_URL_ANALITICO_PRODUCTOS_TOP}`
export const Analytics = () => {

	const [data, setData] = useState([]);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [optionSelected, setOptionSeleted] = useState("Clientes");

	const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const date = event.target.valueAsDate;
		if (date !== null) {
			setStartDate(date.toISOString().slice(0, 10));
		}
	};

	const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const date = event.target.valueAsDate;
		if (date !== null) {
			setEndDate(date.toISOString().slice(0, 10));
		}
	};

	const handleFechas = (startDate: string, endDate: string) => {
		const startDateObj = new Date(startDate);
		const endDateObj = new Date(endDate);

		if (endDateObj < startDateObj) {
			alertError("ERROR DE FECHAS", "La fecha de finalizacion no puede ser menor que inicio. Por favor, inténtalo de nuevo.");
			return;
		}
		handleGetData(startDate, endDate);
	}
	const handleRequestData = () => {
		handleFechas(startDate, endDate);
	}

	const handleGetData = (fecha1: string, fecha2: string) => {
		let url = ""
		if(optionSelected==="Clientes"){
			url = urlClientesProductos
		}
		else if(optionSelected==="Productos"){
			url = urlAnaliticasProductos
		}
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				fecha1: fecha1,
				fecha2: fecha2,
			}),
		})
			.then(response => response.json())
			.then(data => { setData(data) });
	}
	const handleComponent = (param: string) => {
		if (param === "Clientes") {
			return (
				<div style={{
					width: "100vw",
					height: "60vh",
					justifyContent: "center",
					alignItems: "center",
					display: "flex"
				}}>
					<div style={{
						width: "60vw",
						height: "55vh",
					}}>
						<GraficoClientes datos={data} /></div>
				</div>)
		}
		else if (param === "Productos") {
			return (
				<div style={{
					width: "100vw",
					height: "60vh",
					justifyContent: "center",
					alignItems: "center",
					display: "flex"
				}}>
					<div style={{
						width: "60vw",
						height: "55vh",
					}}>
						<GraficoProductos datos={data} /></div>
				</div>)
		}
		else {
			return (<div>
				<h1>Selecione una metrica</h1>
			</div>)
		}

	}
	return (
		<div>
			<Header />
			<div className="container-subheader-analytics">
				{[{ title: "Clientes" },
				{ title: "Productos" },
				{ title: "Costos" },
				{ title: "Pedidos por cliente" }].map((e) => (
					<div className={`${e.title === optionSelected && "active-subheader-analytics"}`} onClick={() => setOptionSeleted(e.title)}>
						<p>{e.title}</p>
					</div>
				))}
			</div>
			<div style={{width:"100vw",display:"flex",justifyContent:"center"}}>
				<h1>Estadisticas</h1>
			</div>
			<div className="container_fechas_analytics">
				<div className="container_inputs_analytics">
					<div>
						<label>Fecha inicial</label>
						<input type="date" onChange={handleStartDateChange} />
					</div>
					<div>
						<label>Fecha final:</label>
						<input type="date" onChange={handleEndDateChange} />
					</div>
					<div>
						<button onClick={() => handleRequestData()}>Buscar</button>
					</div>
				</div>
			</div>

			{handleComponent(optionSelected)}
			<Footer />
		</div>
	);
};
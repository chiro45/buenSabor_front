
import { useState } from "react";
import { GraficoClientes } from "./GraficoClientes";
import { GraficoProductos } from "./GraficoProductos";
import { ButtonStandard, Header, Subheader } from "../../ui";
import { Footer } from "../../ui/Footer/Footer";
import "./Analytics.css"
import { alertError, alertSuccess } from "../../../functions/alerts";
import { fetchPost } from "../../../helpers";
import { useAuth0 } from '@auth0/auth0-react';
import { GraficoCostos } from "./GraficoCostos";
const urlClientesProductos = `${import.meta.env.VITE_URL_ANALITICO_CLIENTES_TOP}`
const urlCostos = `${import.meta.env.VITE_URL_ANALITICO_COSTOS}`
const urlAnaliticasProductos = `${import.meta.env.VITE_URL_ANALITICO_PRODUCTOS_TOP}`
export const Analytics = () => {
	const { getAccessTokenSilently, isAuthenticated } = useAuth0();

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
			alertError("La fecha de finalizacion no puede ser menor que inicio. Por favor, inténtalo de nuevo.", "ERROR DE FECHAS");
			return;
		}
		handleGetData(startDate, endDate);
	}
	const handleRequestData = () => {
		handleFechas(startDate, endDate);
	}

	const handleGetData = async (fecha1: string, fecha2: string) => {
		const token = await getAccessTokenSilently();

		const headers = {
			'Authorization': `Bearer ${token}`
		};
		let url = ""
		if (optionSelected === "Clientes") {
			url = urlClientesProductos
		}
		else if (optionSelected === "Productos") {
			url = urlAnaliticasProductos
		}
		else if (optionSelected === "Costos") {
			url = urlCostos;
		}
		fetchPost(url, {
			fecha1: fecha1,
			fecha2: fecha2,
		}, headers)
			.then(data => {
				setData(data)
				if (data.length === 0) {
					alertSuccess("No se han encontrado datos para este rango de fechas", 'Sin datos suficientes')
				}
			})
			.catch(() => { alertError('Ingrese correctamente las fechas', 'Error al cargar datos') });
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

		else if (param === "Costos") {
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
						<GraficoCostos datos={data} fechaIn={startDate} fechaEnd={endDate} /></div>
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
			<Subheader />
			<div className="container-subheader-analytics">
				{[{ title: "Clientes" },
				{ title: "Productos" },
				{ title: "Costos" },
				{ title: "Pedidos por cliente" }].map((e) => (
					<div className={`subheader-analitycs ${e.title === optionSelected && "active-subheader-analytics"}`} onClick={() => setOptionSeleted(e.title)}>
						<p>{e.title}</p>
					</div>
				))}
			</div>
			<div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
				<h1>Estadisticas</h1>
			</div>
			<div className="container_fechas_analytics">
				<div className="container_inputs_analytics">
					<div className="inputs_analytics">
						<label>Fecha inicial: </label>
						<input type="date" onChange={handleStartDateChange} />
					</div>
					<div className="inputs_analytics">
						<label>Fecha final: </label>
						<input type="date" onChange={handleEndDateChange} />
					</div>
					<div>
						<ButtonStandard
							text={"Buscar"}
							handleClick={() => { handleRequestData() }}
							width={"5vw"}
							fontSize={"1.3rem"}
							height={"3.5vh"}
							backgroundColor={"#0080FF"}
							colorText={"#fff"}
							disabled={!(startDate !== '' && endDate !== '')}
						/>
						{/* <button disabled={!(startDate !== '' && endDate !== '')} onClick={() => handleRequestData()}>Buscar</button> */}
					</div>
				</div>
			</div>

			{handleComponent(optionSelected)}
			<Footer />
		</div>
	);
};
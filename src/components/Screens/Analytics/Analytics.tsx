
import { useState } from "react";
import { GraficoClientes } from "./GraficoClientes";
import { GraficoBarra } from "./GraficoBarra";

const urlClientesProductos = `${import.meta.env.VITE_URL_ANALITICO_CLIENTES_TOP}`

const urlAnaliticasProductos = `${import.meta.env.VITE_URL_ANALITICO_PRODUCTOS_TOP}`
export const Analytics = () => {

  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	const date = event.target.valueAsDate;
	if(date !== null){
	  setStartDate(date.toISOString().slice(0, 10));
	}
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	const date = event.target.valueAsDate;
	if(date !== null){
	  setEndDate(date.toISOString().slice(0, 10));
	}
  };

  const handleFechas=(startDate:string,endDate:string)=>{
	const startDateObj = new Date(startDate);
	const endDateObj = new Date(endDate);

	if (endDateObj < startDateObj) {
		alert("La fecha de finalizacion no puede ser menor que inicio. Por favor, inténtalo de nuevo.");
	  	return;
  	}
	handleGetData(startDate,endDate);
  }
  const handleRequestData = () =>{
	handleFechas(startDate,endDate);
  }
  
  const handleGetData = (fecha1:string,fecha2:string)=>{

	fetch(urlClientesProductos, {
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
	  .then(data => {setData(data)});
  }
  return (
	<div>
	  <h1>Pedidos</h1>
	  <div>
		<label>Start Date:</label>
		<input type="date"  onChange={handleStartDateChange} />
	  </div>
	  <div>
		<label>End Date:</label>
		<input type="date"  onChange={handleEndDateChange} />
	  </div>
	  <button onClick={()=>handleRequestData()}>Buscar</button>
	  <GraficoClientes datos={data}/>
	  <GraficoBarra datos={data} dayStart={startDate} dayEnd={endDate}/> 
	</div>
  );
};
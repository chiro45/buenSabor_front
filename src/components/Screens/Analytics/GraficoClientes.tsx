
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface topClientes{
  emailUsuario: string;
  countCompras: number;
}
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Grafico Mejores Clientes',
    },
  },
  scales: {
    y:{
        grace:"5%"
      }
    }
};
// Función para generar colores aleatorios en formato rgba
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 0.8)`;
};


//{datos:number[],dayStart:}
export const GraficoClientes = ({ datos}: any) => {
  const [dataEntry, setDataEntry] = useState({
    labels: [""],
    datasets: [
      {
        label: "datset",
        data: [],
        backgroundColor: 'rgba(255, 99, 132)',
      }
    ],
  });

  useEffect(() => {
      setDataEntry({
        labels: datos.map((e:topClientes) => e.emailUsuario),
        datasets: [
          {
            label: "datset",
            data: datos.map((e:topClientes) => e.countCompras),
            backgroundColor: datos.map(() => getRandomColor()),
          }
        ],
      });
     
    }, [datos]);
    
  return <Bar options={options} data={dataEntry} />;
}
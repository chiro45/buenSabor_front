
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
import { getRandomColor } from '../../../functions';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Grafico Productos mas vendidos',
    },
  },
  scales: {
    y:{
        grace:"5%"
      }
    }
};



//{datos:number[],dayStart:}
export const GraficoProductos = ({ datos}: any) => {
  const [dataEntry, setDataEntry] = useState({
    labels: [""],
    datasets: [
      {
        label: "Ganancias",
        data: [],
        backgroundColor: 'rgba(210, 99, 132)',
      },
      {
        label: "Costos",
        data: [],
        backgroundColor: 'rgba(255, 99, 132)',
      }
    ],
  });
  useEffect(() => { 
      setDataEntry({
        labels: datos.map((e:any) => e.denominacion),
        datasets: [
          {
            label: "datset",
            data: datos.map((e:any) => e.countVentas),
            backgroundColor:  datos.map(() => getRandomColor()),
          }
        ],
      })
  }, [datos]);
  return <Bar options={options} data={dataEntry} />;
}
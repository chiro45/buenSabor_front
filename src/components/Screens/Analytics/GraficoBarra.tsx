
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
};



//{datos:number[],dayStart:}
export const GraficoBarra = ({ datos, dayStart, dayEnd }: any) => {
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
    if (dayStart !== "" && dayEnd !== "") {
      setDataEntry({
        labels: datos.map((e:any) => e.denominacion),
        datasets: [
          {
            label: "datset",
            data: datos.map((e:any) => e.countVentas),
            backgroundColor: 'rgba(255, 99, 132)',
          }
        ],
      })
    }
  }, [datos]);
  return <Bar options={options} data={dataEntry} />;
}
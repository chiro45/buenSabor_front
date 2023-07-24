
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getIntermediaDates } from '../../../functions';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: 'Chart.js Line Chart',
    },
  },
};

interface CostosGanancias{
  ganancias:number;
  costos:number;
}

export const data = {
  labels: [],
  datasets: [
    {
      label: 'Dataset 1',
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export const GraficoCostos = ({ datos, fechaIn, fechaEnd }: any) => {

  const [dataEntry, setDataEntry] = useState({
    labels: getIntermediaDates(fechaIn, fechaEnd),
    datasets: [
      {
        label: 'Costos',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Ganancias',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });
  useEffect(() => {
    setDataEntry({
      labels: getIntermediaDates(fechaIn, fechaEnd),
      datasets: [
        {
          label: 'Costos',
          data: datos.map((e:CostosGanancias) => e.costos),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Ganancias',
          data: datos.map((e:CostosGanancias) => e.ganancias),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    });

  }, [datos]);
  return <Line options={options} data={dataEntry} />;
}

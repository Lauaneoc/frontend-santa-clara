import { ChartData, ChartOptions } from 'chart.js';

import tailwindColors from 'tailwindcss/colors';

type UseVerticalBarChartParams = {
  legendVisible?: boolean;
  labelDataset?: string;
  legendPosition?: 'bottom' | 'center' | 'chartArea' | 'left' | 'right' | 'top';
  labels?: string[];
  datasetsOptions?: number[];
  backgroundColor?: keyof typeof tailwindColors;
  borderColor?: keyof typeof tailwindColors;
};


export function useVerticalBarChart({
  legendPosition,
  legendVisible,
  datasetsOptions = [],
  labels,
  backgroundColor = 'indigo',
  borderColor = 'indigo',
  labelDataset,
}: UseVerticalBarChartParams) {
  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: legendVisible ?? false,
        position: legendPosition ?? 'bottom',
      },
      title: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
  };


  const data: ChartData<'bar'> = {
    labels: labels,
    datasets: [
      {
        label: labelDataset ?? 'Dataset 1',
        data: datasetsOptions,
        backgroundColor: tailwindColors[backgroundColor][600] ?? tailwindColors.indigo[600],
        borderColor: tailwindColors[borderColor][500] ?? tailwindColors.indigo[500],
        borderWidth: 1,
        borderRadius: 5,
        barThickness: 13,
      },
    ],
  };

  return { options, data, datasetsOptions };
}
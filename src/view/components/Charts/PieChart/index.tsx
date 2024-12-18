import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import tailwindColors from 'tailwindcss/colors';

import { Pie } from 'react-chartjs-2';
import { usePieChart } from './usePieChart';

type IChartData = Array<{
	label: string;
	count: number;
}>;

ChartJS.register(ArcElement, Tooltip, Legend);

export interface PieChartProps {
	chartData: IChartData;
	color: keyof typeof tailwindColors;
}

export function PieChart({ chartData, color }: PieChartProps) {
	const { data, options } = usePieChart({ color, payload: chartData });

	return <Pie options={options} data={data} />;
}

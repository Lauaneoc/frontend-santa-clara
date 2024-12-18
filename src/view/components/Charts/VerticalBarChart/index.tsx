import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import tailwindColors from 'tailwindcss/colors';
import { useVerticalBarChart } from './useVerticalBarChart';
import { cn } from '../../../../@shared/utils/cn';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

export type VerticalBarChartProps = {
	labelDataset?: string;
	legendVisible?: boolean;
	legendPosition?: 'bottom' | 'center' | 'chartArea' | 'left' | 'right' | 'top';
	labels?: string[];
	datasetsOptions?: number[];
	backgroundColor?: keyof typeof tailwindColors;
	borderColor?: keyof typeof tailwindColors;
	className?: string;
};

export function VerticalBarChart({
	legendPosition,
	backgroundColor,
	borderColor,
	datasetsOptions,
	labels,
	labelDataset,
	legendVisible,
	className,
}: VerticalBarChartProps) {
	const { data, options } = useVerticalBarChart({
		datasetsOptions: datasetsOptions,
		labels,
		backgroundColor,
		legendPosition,
		borderColor,
		legendVisible,
		labelDataset,
	});

	return (
		<div className={cn('h-full', className)}>
			<Bar options={options} data={data} />
		</div>
	);
}

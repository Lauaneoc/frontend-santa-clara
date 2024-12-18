import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { useMemo } from 'react';
import tailwindColors from 'tailwindcss/colors';

type UsePieChartParams = {
	legendPosition?: 'bottom' | 'center' | 'chartArea' | 'left' | 'right' | 'top';
	titlePosition?: 'bottom' | 'left' | 'right' | 'top';
	label?: { label: string; mode: 'light' | 'dark' }[];
	datasets?: ChartDataset<'pie'>[];
	color?: keyof typeof tailwindColors;
	title?: string;
	legendTitle?: string
	payload: Array<{label: string, count: number}>
};


export function usePieChart({
	legendPosition,
	titlePosition,
	payload,
	color = 'indigo',
	title,
	legendTitle = ''
}: UsePieChartParams) {
	const options: ChartOptions<'pie'> = useMemo(
		() => ({
			indexAxis: 'y' as const,
			hover: {
				axis: 'y' as const,
			},
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: legendTitle ? true : false,
					text: legendTitle,
					position: legendPosition ?? 'bottom',
				},
				title: {
					display: title ? true : false,
					text: title,
					position: titlePosition,
				},
			},
		}),
		[legendTitle, legendPosition, titlePosition, title]
	);

	const data: ChartData<'pie'> = useMemo(
		() => ({
			labels: payload.map((data) => data.label),
			datasets: [{
				data:  payload.map((data) => data.count),
				backgroundColor: payload.map((_data, index) => {
					const colorWeight = 900 - index * 100 as keyof typeof tailwindColors[typeof color];
					return tailwindColors[color][colorWeight];
				}),
				hoverOffset: 4
			}],
		}),
		[color, payload]
	);

	return { options, data };
}
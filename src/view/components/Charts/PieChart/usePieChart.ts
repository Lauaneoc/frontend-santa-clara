import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { useMemo } from 'react';
import tailwindColors from 'tailwindcss/colors';

type UsePieChartParams = {
	legendPosition?: 'bottom' | 'left' | 'right' | 'top';
	titlePosition?: 'bottom' | 'left' | 'right' | 'top';
	payload?: Array<{ label: string; count: number }>;
	color?: keyof typeof tailwindColors;
	title?: string;
	legendTitle?: string;
};

export function usePieChart({
	legendPosition = 'bottom',
	titlePosition,
	payload = [],
	color = 'indigo',
	title,
	legendTitle = '',
}: UsePieChartParams) {
	const options: ChartOptions<'pie'> = useMemo(
		() => ({
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: !!legendTitle,
					labels: {
						color: tailwindColors.gray[700], // Exemplo de cor padrão
					},
					position: legendPosition,
				},
				title: {
					display: !!title,
					text: title,
					position: titlePosition,
					font: {
						size: 16,
					},
				},
			},
		}),
		[legendTitle, legendPosition, title, titlePosition]
	);

	const data: ChartData<'pie'> = useMemo(() => {
		const maxWeight = 900; // Peso máximo da cor
		const minWeight = 100; // Peso mínimo da cor
		const weightStep = Math.floor((maxWeight - minWeight) / Math.max(payload.length, 1)); // Passo por índice

		return {
			labels: payload.map((item) => item.label),
			datasets: [
				{
					data: payload.map((item) => item.count),
					backgroundColor: payload.map((_item, index) => {
						const weight = Math.max(
							maxWeight - index * weightStep,
							minWeight
						) as keyof typeof tailwindColors[typeof color];

						return tailwindColors[color][weight] || tailwindColors[color][500]; // Fallback para peso 500
					}),
					hoverOffset: 4,
				},
			],
		};
	}, [color, payload]);

	return { options, data };
}

import { ReactNode } from 'react';
import tailwindColors from 'tailwindcss/colors';
import { Card } from '../../@composition/Card';

type IChartData = Array<{
	label: string;
	count: number;
}>;

interface PieChartCardLabelsProps {
	data: IChartData;
	color: keyof typeof tailwindColors;
}

type ComponentsCommonProps = {
	title: string;
	subtitle: string;
	graph: ReactNode;
	labels: ReactNode;
	addOn?: ReactNode;
	className?: string;
};

export function PieChartCardLabels({ data, color }: PieChartCardLabelsProps) {
	return (
		<div className="flex flex-wrap gap-2">
			{data.map((item, index) => {
				const colorWeight = (900 - index * 100) as keyof (typeof tailwindColors)[typeof color];

				return (
					<div
						style={{ backgroundColor: tailwindColors[color][colorWeight] }}
						className="w-24 h-6 text-center rounded-md"
						key={`${item.label}-${item.count}`}
					>
						<p className="text-xs leading-6 font-medium text-white">
							{item.label} - {item.count}
						</p>
					</div>
				);
			})}
		</div>
	);
}

export function PieChartCard({
	labels,
	graph,
	subtitle,
	title,
	addOn,
	className,
}: ComponentsCommonProps) {
	return (
		<Card.Root className={className}>
			<Card.Header>
				<Card.TitleContainer>
					<Card.Title>{title}</Card.Title>
					<Card.Subtitle>{subtitle}</Card.Subtitle>
				</Card.TitleContainer>

				{addOn && <Card.HeaderAddOn>{addOn}</Card.HeaderAddOn>}
			</Card.Header>

			<Card.Content className="w-full h-full flex flex-col 3xl:flex-row gap-y-2 ">
				<div className="flex h-[100%] justify-center items-center">{graph}</div>

				<div className="w-full  h-full grid grid-cols-2 gap-2 grid-rows-1 3x1:grid-rows-2  place-items-center md:pt-5">
					{labels}
				</div>
			</Card.Content>
		</Card.Root>
	);
}

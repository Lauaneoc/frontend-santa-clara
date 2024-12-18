import { ReactNode } from 'react';
import { Card } from '../../@composition/Card';

type VerticalBarProps = {
	title: string;
	graph: ReactNode;
};

export function VerticalBarCard({ title, graph }: VerticalBarProps) {
	return (
		<Card.Root className="w-full h-full">
			<Card.Header>
				<Card.TitleContainer>
					<Card.Title>{title}</Card.Title>
				</Card.TitleContainer>
			</Card.Header>
			<Card.Content className="pl-1">{graph}</Card.Content>
		</Card.Root>
	);
}

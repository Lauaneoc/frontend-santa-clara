import { ReactNode } from 'react';
import { cn } from '../../../../@shared/utils/cn';

type ComponentCommonProps = {
	className?: string;
	children: ReactNode;
};

type RootProps = ComponentCommonProps & {
	onClick?: () => void;
};

function Root({ children, className, onClick }: RootProps) {
	return (
		<div
			onClick={onClick}
			className={cn(
				'bg-white rounded-lg flex flex-col gap-4 p-4 border border-gray-200 shadow-md',
				className,
			)}
		>
			{children}
		</div>
	);
}

function Header({ children, className }: ComponentCommonProps) {
	return (
		<header
			className={cn(
				'flex flex-row gap-1 w-full justify-between items-center',
				className,
			)}
		>
			{children}
		</header>
	);
}

function HeaderAddOn({ children, className }: ComponentCommonProps) {
	return <div className={cn('w-fit h-fit p-2', className)}>{children}</div>;
}

function TitleContainer({ children, className }: ComponentCommonProps) {
	return (
		<div className={cn('flex flex-col gap-1 w-fit h-fit p-2', className)}>
			{children}
		</div>
	);
}

function Title({ children, className }: ComponentCommonProps) {
	return (
		<div
			className={cn('text-black font-semibold text-lg leading-6', className)}
		>
			{children}
		</div>
	);
}

function Subtitle({ children, className }: ComponentCommonProps) {
	return (
		<div
			className={cn(
				'text-gray-500 text-xs font-normal leading-none',
				className,
			)}
		>
			{children}
		</div>
	);
}

function Content({ children, className }: ComponentCommonProps) {
	return <div className={cn('w-full h-full', className)}>{children}</div>;
}

export const Card = {
	Root,
	Header,
	Title,
	TitleContainer,
	Subtitle,
	HeaderAddOn,
	Content,
};

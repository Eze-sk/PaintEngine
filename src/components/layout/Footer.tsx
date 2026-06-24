import { CardWrapper } from "@components/layout/CardWrapper";

interface TypeProps {
	className?: string;
}

export default function Footer({ className }: TypeProps) {
	return (
		<CardWrapper
			gradientStyle="linear"
			variant="cream"
			tag="footer"
			className={`w-full px-2 ${className}`}
		>
			<span className="text-sm">Text footer</span>
		</CardWrapper>
	);
}

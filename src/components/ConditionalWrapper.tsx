interface TypeProps {
	condition: boolean;
	wrapper: (children: React.ReactNode) => React.JSX.Element;
	children: React.ReactNode;
}

export default function ConditionalWrapper({
	condition,
	wrapper,
	children,
}: TypeProps) {
	return condition ? wrapper(children) : <div>{children}</div>;
}

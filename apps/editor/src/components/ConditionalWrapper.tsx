import type { AllowedTags } from "@/types/AllowedTagst";

interface TypeProps<T extends AllowedTags> {
	condition: boolean;
	wrapper: (children: React.ReactNode) => React.JSX.Element;
	children: React.ReactNode;
	defaultTag?: T;
}

export default function ConditionalWrapper<T extends AllowedTags = "div">({
	condition,
	wrapper,
	children,
	defaultTag,
}: TypeProps<T>) {
	const Component = defaultTag || ("div" as React.ElementType);
	return condition ? wrapper(children) : <Component>{children}</Component>;
}

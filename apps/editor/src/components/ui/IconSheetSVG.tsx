import type { HTMLAttributes } from "react";

type TypeIcon =
	| "drop-down"
	| "filter"
	| "search"
	| "minimize"
	| "expand"
	| "close";

type TypeProps = HTMLAttributes<HTMLOrSVGElement> & {
	icon: TypeIcon;
	size: number;
};

export default function IconSheetSVG({ icon, size, ...props }: TypeProps) {
	return (
		<svg {...props} aria-hidden="true" role="img" width={size} height={size}>
			<use href={`/assets/interfaceSpriteSheet.svg#${icon}`} />
		</svg>
	);
}

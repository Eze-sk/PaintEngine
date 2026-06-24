import type { HTMLAttributes } from "react";

type TypeIcon = "drop-down" | "filter" | "search";

type TypeProps = HTMLAttributes<HTMLOrSVGElement> & {
	icon: TypeIcon;
	size: number;
};

export default function SvgWrapper({ icon, size, ...props }: TypeProps) {
	return (
		<svg {...props} aria-hidden="true" width={size} height={size}>
			<use href={`/assets/interfaceSpriteSheet.svg#${icon}`} />
		</svg>
	);
}

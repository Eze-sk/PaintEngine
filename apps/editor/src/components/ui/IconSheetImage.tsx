import { ICON_MAP } from "@consts/icons";

export type IconMapType = typeof ICON_MAP;
type GroupNames = keyof IconMapType;

interface TypeProps<T extends GroupNames> {
	group: T;
	name: keyof IconMapType[T]["icons"];
	className?: string;
	size?: number;
	width?: number;
	height?: number;
}

const BASE_ICON_SIZE = 48;

export default function IconSheetImage<T extends GroupNames>({
	group,
	name,
	className,
	size = 24,
}: TypeProps<T>) {
	const getGroupData = ICON_MAP[group];
	const getIconData =
		getGroupData.icons[name as keyof typeof getGroupData.icons];

	const scale = size / BASE_ICON_SIZE;

	const setX = getIconData.post[0] * -1 * scale;
	const setY = getIconData.post[1] * -1 * scale;

	const backgroundWidth = getGroupData.totalWidth * scale;
	const backgroundHeight = getGroupData.totalHeight * scale;

	return (
		<span
			aria-hidden="true"
			style={{
				display: "inline-block",
				width: `${size}px`,
				height: `${size}px`,
				backgroundImage: `url(${getGroupData.src})`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: `-${setX}px ${setY}px`,
				backgroundSize: `${backgroundWidth}px ${backgroundHeight}px`,
			}}
			className={`${className || ""}`}
		/>
	);
}

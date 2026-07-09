import { Group, Panel } from "react-resizable-panels";
import LeafPanel from "./LeafPanel";

interface TypeProps {
	orientation: "vertical" | "horizontal";
}

export default function EditablePanel({ orientation }: TypeProps) {

	return (
		<Group orientation={orientation}>
			<Panel key="IDDate" className="relative">
				<LeafPanel hasSeparate orientation={orientation} />
			</Panel>
		</Group>
	);
}

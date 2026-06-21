import { Group, Panel } from "react-resizable-panels";
import LeafPanel from "./LeafPanel";
import { useMetadata } from "@store/Metadata";

interface TypeProps {
  orientation: "vertical" | "horizontal";
}

export default function EditablePanel({ orientation }: TypeProps) {
  const currentTabs = useMetadata((store) => store.currentTabs);
  const lastTabs = useMetadata((store) => store.lastTabs);

  if (!currentTabs) return;

  const getMenu = currentTabs.find((it) => it.tabID === lastTabs);

  const menusData = getMenu?.menusData;

  const menuOrientation =
    orientation === "vertical" ? menusData?.sideMenu : menusData?.bottomMenu;

  return (
    <Group orientation={orientation}>
      {menuOrientation?.map((it, index) => {
        const isLast = menuOrientation.length - 1 !== index;
        const IDDate = new Date()
          .toLocaleString("sv-SE", { hour12: false })
          .replace(/[^0-9]/g, "");

        return (
          <Panel key={`${it.menuID}-${IDDate}`} className="relative">
            <LeafPanel hasSeparate={isLast} orientation={orientation} />
          </Panel>
        );
      })}
    </Group>
  );
}

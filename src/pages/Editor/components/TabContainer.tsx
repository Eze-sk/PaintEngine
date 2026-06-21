import { Reorder } from "framer-motion";
import { useMetadata } from "@store/Metadata";
import { CardWrapper } from "@components/layout/CardWrapper";

export default function TabContainer() {
  const currentTabs = useMetadata((state) => state.currentTabs);
  const setCurrentTabs = useMetadata((state) => state.setCurrentTabs);
  // const lastTabs = useMetadata((state) => state.lastTabs);
  const setLastTabs = useMetadata((state) => state.setLastTabs);

  const handleTabClick = (tabID: string) => {
    setLastTabs({ tab: tabID });
  };

  return (
    <Reorder.Group
      axis="x"
      values={currentTabs}
      onReorder={setCurrentTabs}
      className="flex gap-2 p-2"
    >
      {currentTabs.map((tb) => {
        // const isActive = lastTabs === tb.tabID;

        return (
          <Reorder.Item
            key={tb.tabID}
            value={tb}
            className="cursor-pointer"
            onClick={() => handleTabClick(tb.tabID)}
            dragConstraints={{ top: 0, bottom: 0 }}
          >
            <CardWrapper
              className="border border-white rounded px-2 flex items-center gap-1"
              variant="cream"
              gradientStyle="circular"
              tag="div"
            >
              <div className="bg-gray-200 w-3 h-3 border rounded-sm"></div>
              <span className="text-sm">{tb.title}</span>
            </CardWrapper>
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
}

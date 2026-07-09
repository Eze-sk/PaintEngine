import { CardWrapper } from "@components/layout/CardWrapper";
import IconSheetImage from "@components/ui/IconSheetImage";
import { useMetadataStore } from "@store/Metadata";
import { Reorder } from "motion/react";
import { useState } from "react";

export default function TabContainer() {
  const currentTabs = useMetadataStore((state) => state.tabs)
  const setCurrentTabs = useMetadataStore((state) => state.setTabs)

  const [activeTab, setActiveTab] = useState("home");

  const handleActiveTab = (tabID: string) => {
    setActiveTab(tabID);
  };

  return (
    <div className="max-w-[90%] w-full overflow-hidden">
      <Reorder.Group
        axis="x"
        values={currentTabs}
        onReorder={setCurrentTabs}
        className="flex gap-2 p-2"
      >
        {currentTabs.map((tb) => {
          const isActive = activeTab === tb.tabID;

          return (
            <Reorder.Item
              key={tb.tabID}
              value={tb}
              className="cursor-pointer"
              onClick={() => handleActiveTab(tb.tabID)}
              dragConstraints={{ top: 0, bottom: 0 }}
            >
              <CardWrapper
                className="rounded px-2 py-1 flex items-center gap-1.25 min-w-40"
                variant="glass"
                shadingStyle={isActive ? "active" : "linear"}
                shadingSize="small"
                tag="div"
                hasHover
              >
                <IconSheetImage
                  group="tab"
                  size={18}
                  name={tb.icon ?? "audioEditor"}
                />
                <span className="text-white text-sm font-light">
                  {tb.title}
                </span>
              </CardWrapper>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </div>
  );
}

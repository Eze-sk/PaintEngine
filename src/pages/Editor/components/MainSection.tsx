import { Group, Panel } from "react-resizable-panels";
import { CardWrapper } from "@components/layout/CardWrapper";
import CanvasWrapper from "@components/layout/CanvasWrapper";
import EditablePanel from "./EditablePanel";

export default function MainSection() {
  return (
    <Group orientation="vertical" className="gap-1 main-background p-1">
      <Panel defaultSize={80}>
        <Group orientation="horizontal" className="gap-2">
          <Panel defaultSize={80} minSize={311}>
            <CanvasWrapper />
          </Panel>
          <Panel defaultSize={20} minSize={20}>
            <CardWrapper
              gradientStyle="square"
              variant="cream"
              className="h-full rounded-lg overflow-x-hidden p-2 relative"
            >
              <EditablePanel orientation="vertical" />
            </CardWrapper>
          </Panel>
        </Group>
      </Panel>
      <Panel defaultSize={20} minSize={20} maxSize={500}>
        <CardWrapper
          gradientStyle="square"
          variant="cream"
          className="h-full rounded-lg overflow-x-hidden p-2 relative"
        >
          <EditablePanel orientation="horizontal" />
        </CardWrapper>
      </Panel>
    </Group>
  );
}

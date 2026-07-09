import ConditionalWrapper from "@components/ConditionalWrapper";
import { CardWrapper } from "@components/layout/CardWrapper";
import IconSheetImage from "@components/ui/IconSheetImage";
import { motion, useDragControls } from "motion/react";
import { Resizable } from "re-resizable";
import React, {
  createContext,
  Suspense,
  useContext,
  useMemo,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "react-router";
import IconSheetSVG from "./IconSheetSVG";

export const ContainerContext = createContext<{
  isOpen: boolean;
  toggle: () => void;
} | null>(null);

function WindowManager({
  activeQuery,
  children,
}: {
  activeQuery?: string;
  children?: React.ReactNode;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const isOpen = searchParams.get("open") === activeQuery;

  const toggle = () => {
    if (isOpen) {
      setSearchParams({}, { replace: true });
    } else {
      if (activeQuery) {
        setSearchParams({ open: activeQuery });
      }
    }
  };

  return (
    <ContainerContext.Provider value={{ isOpen, toggle }}>
      {children}
    </ContainerContext.Provider>
  );
}

export function ButtonOpenWindow({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const context = useContext(ContainerContext);

  if (!context) {
    throw new Error(
      "WindowContainer.Button must be used inside a <WindowContainer />",
    );
  }

  return (
    <button className={className} type="button" onClick={context.toggle}>
      {children}
    </button>
  );
}

interface TypeWindowManagerProps {
  title: string;
  icon: {
    group: string;
    name: string;
    size?: number;
  };
  initialFormat: "floating" | "docked";
  // biome-ignore lint/suspicious/noExplicitAny: React.lazy explicitly requires the use of any for the load promise
  content: () => Promise<any>;
}

export function WindowWrapper({
  title,
  icon,
  initialFormat,
  content,
}: TypeWindowManagerProps) {
  const context = useContext(ContainerContext);

  const { LazyHeader, LazyBody } = useMemo(() => {
    return {
      LazyHeader: React.lazy(() =>
        content().then((module) => ({
          default: module.Header || (() => null),
        })),
      ),
      LazyBody: React.lazy(() =>
        content().then((module) => ({ default: module.Body })),
      ),
    };
  }, [content]);

  if (!context?.isOpen) return;

  return (
    <ConditionalWrapper
      condition={initialFormat === "floating"}
      defaultTag="section"
      wrapper={(children) => <WindowFloating>{children}</WindowFloating>}
    >
      <header className="flex items-center justify-between">
        <div className="flex gap-3 pt-1 pb-2">
          <div className="flex items-center gap-1">
            <IconSheetImage
              group={icon.group}
              name={icon.name}
              size={icon.size ?? 48}
            />
            <h2 className="text-white shadown text-shadow-lg text-sm">
              {title}
            </h2>
          </div>
          {initialFormat !== "floating" && (
            <Suspense fallback={<span>Loading...</span>}>
              <LazyHeader />
            </Suspense>
          )}
        </div>
        {initialFormat && (
          <div className="flex gap-2 *:rounded">
            <CardWrapper
              tag="button"
              type="button"
              variant="glass"
              shadingStyle="square"
              hasHover
            >
              <IconSheetSVG icon="minimize" size={25} />
            </CardWrapper>
            <CardWrapper
              tag="button"
              type="button"
              variant="glass"
              shadingStyle="square"
              hasHover
            >
              <IconSheetSVG icon="expand" size={25} />
            </CardWrapper>
            <CardWrapper
              tag="button"
              type="button"
              variant="red"
              shadingStyle="square"
              hasHover
              onClick={context.toggle}
            >
              <IconSheetSVG icon="close" size={25} />
            </CardWrapper>
          </div>
        )}
      </header>

      <CardWrapper
        tag="section"
        variant="cream"
        shadingStyle="square"
        className="h-full w-full overflow-hidden"
      >
        <Suspense fallback={<span>Loading...</span>}>
          <LazyBody />
        </Suspense>
      </CardWrapper>
    </ConditionalWrapper>
  );
}

function WindowFloating({ children }: { children?: React.ReactNode }) {
  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const dragControls = useDragControls();

  return createPortal(
    <div
      ref={constraintsRef}
      className="fixed inset-0 pointer-events-none z-50"
    >
      <motion.div
        drag
        dragListener={false}
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={constraintsRef}
        className="absolute pointer-events-auto"
        style={{ left: "30%", top: "20%" }}
      >
        <Resizable
          defaultSize={{
            width: 500,
            height: 400,
          }}
          minWidth={250}
          minHeight={200}
          handleClasses={{
            bottomRight: "cursor-se-resize",
          }}
          className="flex flex-col"
        >
          <CardWrapper
            variant="blue"
            shadingStyle="square"
            className="p-1 rounded w-full h-full flex flex-col overflow-auto relative"
          >
            {children}
          </CardWrapper>
        </Resizable>
      </motion.div>
    </div>,
    document.getElementById("modal-root") || document.body,
  );
}

WindowManager.Button = ButtonOpenWindow;
WindowManager.Wrapper = WindowWrapper;

export default WindowManager;

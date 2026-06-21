import type {
  TypeComponentRegistry,
  TypesOfMenus,
} from "@/types/MenuSelectors";
import { lazy, useRef, Suspense } from "react";
import ContextMenu, { type TypeListMenu } from "@components/ui/ContextMenu";
import SvgWrapper from "@components/layout/SvgWrapper";

const componentRegistry: TypeComponentRegistry = {
  hierarchy: {
    Header: lazy(() => import("./menuLeaf/HeaderHierarchy")),
    Body: lazy(() => import("./menuLeaf/BodyHierarchy")),
  },
  assetsBrowser: {
    Header: lazy(() => import("./menuLeaf/HeaderAssetBrowser")),
    Body: lazy(() => import("./menuLeaf/BodyAssetBrowser")),
  },
};

interface TypeProps {
  orientation: "vertical" | "horizontal";
  hasSeparate: boolean;
  type?: TypesOfMenus;
  index?: number;
  onSplit?: (index: number) => void;
}

export default function LeafPanel({
  orientation,
  hasSeparate,
  type = "hierarchy",
}: TypeProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  const currentPanel =
    componentRegistry[type] || componentRegistry["hierarchy"];

  const setSeparate =
    orientation === "vertical" ? "border-shaded-bottom" : "border-shaded-left";

  const style = `
    ${hasSeparate ? setSeparate : ""} w-full h-full
  `;

  const HeaderComponent = currentPanel.Header;
  const BodyComponent = currentPanel.Body;

  return (
    <section className={style} ref={panelRef}>
      <header className="flex items-center justify-between p-1">
        <MenuChangeButton />
        {HeaderComponent && (
          <Suspense fallback={<div>Cargando Header...</div>}>
            <HeaderComponent />
          </Suspense>
        )}
      </header>
      <div>
        <Suspense fallback={<div>Cargando Header...</div>}>
          <BodyComponent />
        </Suspense>
      </div>
    </section>
  );
}

const Menus: TypeListMenu = [
  {
    label: "New",
    shortcut: "Ctrl+N",
  },
  {
    label: "Open",
    shortcut: "Ctrl+O",
    hasCheckbox: true,
  },
];

function MenuChangeButton() {
  return (
    <ContextMenu
      position="respectFather"
      activationEvent="leftClick"
      list={Menus}
      className="flex items-center hover:brightness-50"
    >
      <span className="text-xs text-gray-500">Editor tipe</span>
      <SvgWrapper icon="drop-down" size={13} />
    </ContextMenu>
  );
}

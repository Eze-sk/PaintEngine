import { CardWrapper } from "@components/layout/CardWrapper";
import ContextMenu, { type TypeListMenu } from "@components/ui/ContextMenu";

interface MenuType {
  title: string;
  hasCheckbox?: boolean;
  list: TypeListMenu;
}

const Menus: MenuType[] = [
  {
    title: "File",
    list: [
      {
        label: "New",
        shortcut: "Ctrl+N",
      },
      {
        label: "Open",
        shortcut: "Ctrl+O",
        hasCheckbox: true,
      },
    ],
  },
  {
    title: "Edit",
    list: [
      {
        label: "context 1",
      },
    ],
  },
  {
    title: "View",
    list: [
      {
        label: "context 1",
      },
    ],
  },
  {
    title: "Image",
    list: [
      {
        label: "context 1",
      },
    ],
  },
  {
    title: "Colors",
    list: [
      {
        label: "context 1",
      },
    ],
  },
  {
    title: "Help",
    list: [
      {
        label: "context 1",
      },
    ],
  },
];

export default function MenuBar() {
  return (
    <CardWrapper
      variant="cream"
      shadingStyle="linear"
      className="w-full px-2 py-2 flex items-center gap-4"
      tag="nav"
    >
      {Menus.map((it) => (
        <ContextMenu
          key={`${it.title}`}
          list={it.list}
          position="respectFather"
          activationEvent="leftClick"
        >
          <span className="font-medium">{it.title}</span>
        </ContextMenu>
      ))}
    </CardWrapper>
  );
}

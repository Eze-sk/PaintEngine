import ContextMenu, { type TypeListMenu } from "./ContextMenu";
import SvgWrapper from "@components/layout/SvgWrapper";

interface TypeProps {
  activateFilters: boolean;
  menuFilter?: TypeListMenu;
}

export default function SearchInput({
  activateFilters,
  menuFilter,
}: TypeProps) {
  if (activateFilters && menuFilter === undefined) {
    throw new Error("Data must be added to the filter menu");
  }

  return (
    <>
      <div>
        <SvgWrapper icon="search" size={14} />
        <input type="search" />
      </div>
      {activateFilters && (
        <ContextMenu
          activationEvent="leftClick"
          position="respectFather"
          list={menuFilter}
        >
          <SvgWrapper icon="filter" size={14} />
          <SvgWrapper icon="drop-down" size={7} />
        </ContextMenu>
      )}
    </>
  );
}

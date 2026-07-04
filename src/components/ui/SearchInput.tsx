import ContextMenu, { type TypeListMenu } from "@components/ui/ContextMenu";
import IconSheetImage from "@components/ui/IconSheetImage";
import IconSheetSVG from "@components/ui/IconSheetSVG";

interface TypeProps {
  activateFilters?: boolean;
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
      <label className="flex gap-2 w-full border border-gray-400 items-center">
        <IconSheetImage
          group="general"
          name="searchFolder"
          width={18}
          height={18}
        />
        <IconSheetImage group="tab" size={20} name="audioEditor" />
        <input type="search" className="w-full" />
      </label>
      {activateFilters && (
        <ContextMenu
          activationEvent="leftClick"
          position="respectFather"
          list={menuFilter}
        >
          <IconSheetSVG icon="filter" size={14} />
        </ContextMenu>
      )}
    </>
  );
}

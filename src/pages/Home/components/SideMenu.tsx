import { CardWrapper } from "@components/layout/CardWrapper";
import Icon from "@components/ui/Icon";

interface TypeContent {
  label: string;
  indexUnderline: number;
  icon: string;
}

const NAVIGATION_CONTENT: TypeContent[][] = [
  [
    {
      label: "New",
      indexUnderline: 0,
      icon: "stackedDocuments",
    },
    {
      label: "Community",
      indexUnderline: 0,
      icon: "userGroup",
    },
    {
      label: "Documentation",
      indexUnderline: 0,
      icon: "folderFiles",
    },
  ],
  [
    {
      label: "GitHub",
      indexUnderline: 0,
      icon: "controlPanel",
    },
    {
      label: "Ezesk.dev",
      indexUnderline: 0,
      icon: "controlPanel",
    },
  ],
  [
    {
      label: "Preferences",
      indexUnderline: 0,
      icon: "gear",
    },
  ],
];

export default function SideMenu() {
  return (
    <CardWrapper
      variant="cream"
      shadingStyle="square"
      className="h-full w-50 p-2 flex flex-col"
      tag="nav"
    >
      {NAVIGATION_CONTENT.map((it, index) => {
        const isLast = NAVIGATION_CONTENT.length - 1 !== index;
        const setBorder = isLast ? "border-shaded-bottom" : "";

        const uniqueKey = `group-${index}`;

        return (
          <ul
            className={`${setBorder} flex flex-col gap-4 py-4`}
            key={uniqueKey}
          >
            {it.map((it) => {
              const label = it.label;
              const index = it.indexUnderline;

              const previousLetters = label.substring(0, index);
              const underlinedLetter = label.charAt(index);
              const letterAfter = label.substring(index + 1);

              return (
                <li key={label} className="flex gap-3 py-1 items-center">
                  <Icon
                    group="home"
                    size={35}
                    name={it.icon ?? "controlPanel"}
                  />
                  <span className="truncate">
                    {previousLetters}
                    <span className="underline">{underlinedLetter}</span>
                    {letterAfter}
                  </span>
                </li>
              );
            })}
          </ul>
        );
      })}
    </CardWrapper>
  );
}

import { CardWrapper } from "@components/layout/CardWrapper";
import IconSheetImage from "@components/ui/IconSheetImage";
import WindowManager from "@components/ui/WindowManager";

interface TypeContent {
  label: string;
  indexUnderline: number;
  icon: string;
  hasWindow?: true;
  windowData?: {
    title: string;
    activeQuery: string;
    componentPath: string;
  };
}

const NAVIGATION_CONTENT: TypeContent[][] = [
  [
    {
      label: "New",
      indexUnderline: 0,
      icon: "stackedDocuments",
      hasWindow: true,
      windowData: {
        title: "New project",
        activeQuery: "new-project",
        componentPath: "../windowContents/StartProject",
      },
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

              return (
                <li key={label} className="flex gap-3 py-1 items-center">
                  {it.hasWindow ? (
                    <WindowManager
                      key={label}
                      activeQuery={it.windowData?.activeQuery ?? ""}
                    >
                      <WindowManager.Button className="flex gap-3 py-1 items-center">
                        <SetLabel
                          label={label}
                          setIndex={it.indexUnderline}
                          icon={it.icon}
                        />
                      </WindowManager.Button>
                      <WindowManager.Wrapper
                        content={() =>
                          import(it.windowData?.componentPath ?? "")
                        }
                        initialFormat="floating"
                        title={it.windowData?.title ?? ""}
                        icon={{
                          group: "home",
                          name: it.icon,
                          size: 18,
                        }}
                      />
                    </WindowManager>
                  ) : (
                    <SetLabel
                      label={label}
                      setIndex={it.indexUnderline}
                      icon={it.icon}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        );
      })}
    </CardWrapper>
  );
}

function SetLabel({
  label,
  setIndex,
  icon,
}: {
  label: string;
  setIndex: number;
  icon: string;
}) {
  const index = setIndex;

  const previousLetters = label.substring(0, index);
  const underlinedLetter = label.charAt(index);
  const letterAfter = label.substring(index + 1);

  return (
    <>
      <IconSheetImage group="home" size={35} name={icon ?? "controlPanel"} />
      <span className="truncate">
        {previousLetters}
        <span className="underline">{underlinedLetter}</span>
        {letterAfter}
      </span>
    </>
  );
}

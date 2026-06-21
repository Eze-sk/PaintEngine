import { db } from "@/db";
import { STARTUP_DATA } from "@consts/startupData";
import { useMetadata } from "@store/Metadata";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router";

export function useStart() {
  const setCurrentTabs = useMetadata((state) => state.setCurrentTabs);
  const setLastTabs = useMetadata((state) => state.setLastTabs);

  const [projectLimit, setProjectLimit] = useState(false);

  const { project_name } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get("tab") || "scene_0";

  useEffect(() => {
    let isMounted = true;

    const setStart = async () => {
      try {
        const count = await db.projectMetadata.count();

        if (!isMounted) return;

        if (count === 0) {
          const data = STARTUP_DATA;

          db.projectMetadata.add({
            id: project_name,
            name: project_name,
            currentTabs: data.currentTabs,
            lastTab: data.lastTab,
            updatedAt: new Date(),
          });

          setSearchParams({ tab });
          setSearchParams({ tab: data.lastTab });
          setCurrentTabs(data.currentTabs);
          setLastTabs({ tab: data.lastTab });
        } else {
          if (count === 3) {
            return setProjectLimit(true);
          }

          const getData = await db.projectMetadata.toArray();

          const projectData = getData.find((value) => {
            return value.name === project_name || value.name === "draft";
          });

          if (projectData) {
            setSearchParams({ tab: projectData.lastTab });
            setCurrentTabs(projectData.currentTabs);
            setLastTabs({ tab: projectData.lastTab });
          }
        }
      } catch (err) {
        console.error(`Error initializing the database: ${err}`);
      }
    };

    setStart();

    return () => {
      isMounted = false;
    };
  }, [project_name, setCurrentTabs, setLastTabs, setSearchParams, tab]);

  return { projectLimit };
}

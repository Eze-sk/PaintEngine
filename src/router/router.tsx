import { createBrowserRouter, redirect } from "react-router";
import { customRandom, urlAlphabet } from "nanoid";
import seedrandom from "seedrandom";

import EditorPage from "@pages/Editor/Page";

const rng = seedrandom("url");

export const router = createBrowserRouter([
  {
    path: "/editor/",
    loader: async () => {
      try {
        const nanoID = customRandom(urlAlphabet, 3, (size) => {
          return new Uint8Array(size).map(() => Math.floor(256 * rng()));
        });

        return redirect(`/editor/draft-${nanoID()}`);
      } catch (err) {
        throw new Error("Engine start error", {
          cause: err,
        });
      }
    },
  },
  {
    path: "/editor/:project_name",
    element: <EditorPage />,
  },
]);

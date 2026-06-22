import { createBrowserRouter } from "react-router";

import EditorPage from "@pages/Editor/Page";
import HomePage from "@pages/Home/Page";

export const router = createBrowserRouter([
  {
    path: "/editor",
    element: <HomePage />,
  },
  {
    path: "/editor/:project_name",
    element: <EditorPage />,
  },
]);

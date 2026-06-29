import RootLayout from "@layouts/RootLayout";
import EditorPage from "@pages/Editor/Page";
import HomePage from "@pages/Home/Page";

import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
	{
		path: "/editor",
		Component: RootLayout,
		children: [
			{ index: true, Component: HomePage },
			{
				path: "/editor/:project_name",
				Component: EditorPage,
				handle: { hasMenuBar: true },
			},
		],
	},
]);

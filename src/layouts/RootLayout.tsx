import Footer from "@components/layout/Footer";
import Header from "@components/layout/Header";
import MenuBar from "@components/ui/MenuBar";
import { Outlet } from "react-router";

interface TypeProps {
	hasMenuBar?: boolean;
}

export default function RootLayout({ hasMenuBar = false }: TypeProps) {
	return (
		<div className="h-screen grid grid-rows-[auto_1fr]">
			<div>
				<Header />
				{hasMenuBar && <MenuBar />}
			</div>
			<main className="grid grid-cols-[auto_1fr] grid-rows-[1fr_auto]">
				<Outlet />
				<Footer className="col-span-2" />
			</main>
		</div>
	);
}

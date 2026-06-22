import Footer from "@components/layout/Footer";
import Header from "@components/layout/Header";
import SideMenu from "./components/SideMenu";

export default function HomePage() {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr]">
      <Header hasUserProfile distribution="end" />
      <main className="grid grid-cols-[auto_1fr] grid-rows-[1fr_auto]">
        <SideMenu />
        <div>Content</div>
        <div className="col-span-2">
          <Footer />
        </div>
      </main>
    </div>
  );
}

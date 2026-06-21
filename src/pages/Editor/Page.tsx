import Header from "./components/Header";
import MenuBar from "./components/MenuBar";
import ToolBox from "./components/ToolBox";
import Footer from "./components/Footer";
import MainSection from "./components/MainSection";
import { useStart } from "@hooks/useStart";

export default function EditorPage() {
  const { projectLimit } = useStart();

  if (projectLimit) {
    return <h2>You can only create 3 local projects</h2>;
  }

  return (
    <div className="h-screen grid grid-rows-[auto_1fr]">
      <div>
        <Header />
        <MenuBar />
      </div>
      <main className="grid grid-cols-[auto_1fr] grid-rows-[1fr_auto]">
        <ToolBox />
        <MainSection />
        <div className="col-span-2">
          <Footer />
        </div>
      </main>
    </div>
  );
}

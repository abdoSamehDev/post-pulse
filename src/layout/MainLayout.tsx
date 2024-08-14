import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = (): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-5/6 mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

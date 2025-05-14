import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";
import { Outlet, useNavigation } from "react-router-dom";

function AppLayout({ logo }) {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] overflow-x-hidden">
      {isLoading && <Loader />}

      <Header logo={logo} />

      <div className="md:overflow-y-scroll w-screen">
        <main className="w-full ">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default AppLayout;

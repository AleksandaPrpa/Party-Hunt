import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";
import { Outlet, useNavigation } from "react-router-dom";
import LogoOnlyHeader from "./LogoOnlyHeader";

function AppLayout({ logo }) {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const currentPath = window.location.pathname;

  const shouldShowHeader =
    currentPath !== "/" && currentPath !== "/profile/register";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] overflow-x-hidden">
      {isLoading && <Loader />}

      {shouldShowHeader ? (
        <Header logo={logo} />
      ) : (
        <LogoOnlyHeader logo={logo} />
      )}

      <div className="md:overflow-y-scroll md:overflow-hidden w-screen bg-slate-900">
        <main className="w-full">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default AppLayout;

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import Error from "./UI/Error";
import Profile from "./Pages/Profile";
import FindAParty from "./Pages/FindAParty";
import ThrowAParty from "./Pages/ThrowAParty";
import FindAPartyShowMore from "./Pages/FindAPartyShowMore";
import Home from "./Pages/Home";
import logo from "./assets/logo.svg";
import Reservation from "./Pages/Reservation";

const router = createBrowserRouter([
  {
    element: <AppLayout logo={logo} />,
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
        //loader: loader,
        errorElement: <Error />,
      },
      { path: "/findAParty", element: <FindAParty /> },
      {
        path: "/findAParty/:id",
        element: <FindAPartyShowMore />,
        //loader: loader,
        errorElement: <Error />,
      },
      {
        path: "/findAParty/:id/reservation",
        element: <Reservation />,
        //loader: loader,
        errorElement: <Error />,
      },
      {
        path: "/throwAParty",
        element: <ThrowAParty />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

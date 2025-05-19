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
import ProtectedRoute from "./components/ProtectedRoute";

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
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: "/findAParty",
        element: (
          <ProtectedRoute>
            <FindAParty />
          </ProtectedRoute>
        ),
      },
      {
        path: "/findAParty/:id",
        element: (
          <ProtectedRoute>
            <FindAPartyShowMore />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: "/findAParty/:id/reservation",
        element: (
          <ProtectedRoute>
            <Reservation />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: "/throwAParty",
        element: (
          <ProtectedRoute>
            <ThrowAParty />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

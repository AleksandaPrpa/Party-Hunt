import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import Error from "./UI/Error";
import Profile from "./Pages/Profile";
import FindAParty from "./Pages/FindAParty";
import ThrowAParty from "./Pages/ThrowAParty";
import FindAPartyShowMore from "./Pages/FindAPartyShowMore";
import Home from "./Pages/Home";
// import logo from "./assets/logo.svg";
import Reservation from "./Pages/Reservation";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileHostedParty from "./Pages/ProfileHostedParty";
import Register from "./Pages/Register";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/register",
        element: <Register />,
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
        path: "/profile/hostedparty/:id",
        element: (
          <ProtectedRoute>
            <ProfileHostedParty />
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

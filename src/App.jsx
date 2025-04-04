import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from "./assets/logo.svg";
import Header from "./Components/Header/Header";
import Profile from "./Pages/Profile";
import FindAParty from "./Pages/FindAParty";
import ThrowAParty from "./Pages/ThrowAParty";
import Home from "./Pages/Home";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <Router>
      <Header logo={logo} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/findAParty" element={<FindAParty />} />
        <Route path="/throwAParty" element={<ThrowAParty />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;

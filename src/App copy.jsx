import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from "./assets/logo.svg";
import Profile from "./Pages/Profile";
import FindAParty from "./Pages/FindAParty";
import ThrowAParty from "./Pages/ThrowAParty";
import Home from "./Pages/Home";
import Header from "./Components/UI/Header";
import Footer from "./Components/UI/Footer";

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
      <Footer />
    </Router>
  );
}

export default App;

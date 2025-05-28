import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../pages/Home/Landing";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

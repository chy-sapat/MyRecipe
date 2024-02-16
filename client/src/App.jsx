import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/auth";
import "./app.scss";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import Spinner from "./components/loadingSpinner";
import Layout from "./pages/Home/Layout";
import { useEffect } from "react";
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/*" element={<Layout />} />
            <Route path="/auth" element={<Auth />}>
              <Route index element={<Login />} />
              <Route path="signup" element={<Register />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

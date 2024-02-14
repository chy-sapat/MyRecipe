import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/auth";
import "./app.scss";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import Spinner from "./components/loadingSpinner";
import Feed from "./pages/Home/feed";
import { useEffect } from "react";
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route index element={<Feed />} />
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

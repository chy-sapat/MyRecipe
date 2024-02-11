import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
import "./app.scss";
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/auth/*" element={<Auth />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

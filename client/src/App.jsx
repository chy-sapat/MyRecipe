import { BrowserRouter as Router } from "react-router-dom";
import Auth from "./pages/auth";
import "./app.scss";
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Auth />
        </div>
      </Router>
    </>
  );
}

export default App;

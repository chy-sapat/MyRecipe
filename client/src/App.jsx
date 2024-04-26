import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/auth";
import "./app.scss";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import Spinner from "./components/loadingSpinner";
import Layout from "./pages/Home/Layout";
import CreateAccountForm from "pages/Auth/form";
import CreatePreference from "pages/Auth/preference";
import ProfileImgUpload from "pages/Auth/profileImgUpload";
import AdminDashboard from "pages/Admin/dashboard";
import AdminLogin from "pages/Admin/login";
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
            <Route path="/create-profile">
              <Route index element={<CreateAccountForm />} />
              <Route
                path="upload-profile-image"
                element={<ProfileImgUpload />}
              />
              <Route path="preference" element={<CreatePreference />} />
            </Route>
            <Route path="/admin/*">
              <Route index element={<AdminDashboard />} />
              <Route path="login" element={<AdminLogin />} />
            </Route>
            {/* <Route path="*" element={<h1>Nothing to see here!</h1>} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

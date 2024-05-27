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
import AdminLayout from "pages/Admin/adminLayout";
import UserManagement from "@components/AdminManagement/userManagement";
import RecipeManagement from "@components/AdminManagement/recipeManagement";
import ProRecipe from "@components/AdminManagement/proRecipe";
import Setting from "@components/AdminManagement/setting";
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
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="user-management" element={<UserManagement />} />
              <Route path="recipe-management" element={<RecipeManagement />} />
              <Route path="pro-recipe" element={<ProRecipe />} />
              <Route path="setting" element={<Setting />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            {/* <Route path="*" element={<h1>Nothing to see here!</h1>} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

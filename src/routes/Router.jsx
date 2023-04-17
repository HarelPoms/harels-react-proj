import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage";
import EditCardPage from "../pages/EditCardPage";
import ProtectedRoute from "../components/ProtectedRoute";
import ProfilePage from "../pages/ProfilePage";
import SuperProtectedRoute from "../components/SuperProtectedRoute";
import LogoutPage from "../pages/LogoutPage";
import NewCardPage from "../pages/NewCardPage";
import FullDetailsCardPage from "../pages/FullDetailsCardPage";
import MyCardsPage from "../pages/MyCardsPage";
import FavCardsPage from "../pages/FavCardsPage"
import AboutPage from "../pages/AboutPage"

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route
        path={ROUTES.LOGOUT}
        element={<ProtectedRoute element={<LogoutPage />} />}
      />
      <Route path={ROUTES.MYCARDS} element={<ProtectedRoute element={<MyCardsPage />} />} />
      <Route path="/new_card" element={
      <SuperProtectedRoute isAdmin={false} isBiz={true} element={<NewCardPage />} />
      } />
      <Route
        path="/edit/:id"
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={true}
            element={<EditCardPage />}
          />
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={<ProtectedRoute element={<ProfilePage />} />}
      />
      <Route path="/my_favs" element={
      <SuperProtectedRoute isAdmin={false} isBiz={false} element={<FavCardsPage />} />
      } />
      <Route path={ROUTES.FULLCARDDETAILS} element={<FullDetailsCardPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;

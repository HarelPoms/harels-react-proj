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
import SandboxPage from "../pages/SandboxPage"
import NestedRoutePage from "../pages/SandboxPages/NestedRoutePages/NestedRoutePage";
import NestedPage1 from "../pages/SandboxPages/NestedRoutePages/NestedPage1";
import NestedPage2 from "../pages/SandboxPages/NestedRoutePages/NestedPage2";
import RP1 from "../pages/SandboxPages/RP1";
import RP2 from "../pages/SandboxPages/RP2";
import ReRenderPage from "../pages/SandboxPages/ReRenderPage/ReRenderPage";

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
      <Route path={ROUTES.SANDBOX} element={<SuperProtectedRoute isAdmin={true} isBiz={false} element={<SandboxPage />} />} > 
        <Route path="nr" element={<NestedRoutePage />} />
        <Route path="rrp" element={<ReRenderPage />} />
        <Route path="rp1" element={<RP1 />} />
        <Route path="rp2" element={<RP2 />} />
      </Route>
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;

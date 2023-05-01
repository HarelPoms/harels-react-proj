import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage";
import EditCardPage from "../pages/EditCardPage";
import LoggedInRoute from "../components/LoggedInRoute";
import ProfilePage from "../pages/ProfilePage";
import PermissionsProtectedRoute from "../components/PermissionsProtectedRoute";
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
        element={<LoggedInRoute element={<LogoutPage />} />}
      />
      <Route path={ROUTES.MYCARDS} element={<LoggedInRoute element={<MyCardsPage />} />} />
      <Route path="/new_card" element={
      <PermissionsProtectedRoute isAdmin={false} isBiz={true} isBizOrAdmin={true} element={<NewCardPage />} />
      } />
      <Route
        path="/edit/:id"
        element={
          <PermissionsProtectedRoute
            isAdmin={true}
            isBiz={true}
            isBizOrAdmin={true}
            element={<EditCardPage />}
          />
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={<LoggedInRoute element={<ProfilePage />} />}
      />
      <Route path="/my_favs" element={
      <LoggedInRoute element={<FavCardsPage />} />
      } />
      <Route path={ROUTES.FULLCARDDETAILS} element={<FullDetailsCardPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.SANDBOX} element={<PermissionsProtectedRoute isAdmin={true} isBiz={false} isBizOrAdmin={true} element={<SandboxPage />} />} > 
        <Route path="nr" element={<NestedRoutePage />} >
          <Route path="nestedpage1" element={<NestedPage1 />} />
          <Route path="nestedpage2" element={<NestedPage2 />} />
        </Route>
        <Route path="rrp" element={<ReRenderPage />} />
        <Route path="rp1" element={<RP1 />} />
        <Route path="rp2" element={<RP2 />} />
      </Route>
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;

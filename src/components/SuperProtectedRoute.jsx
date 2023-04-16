import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const SuperProtectedRoute = ({ element, isAdmin, isBiz }) => {
  //* logic section
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  const payload = useSelector((bigState) => bigState.authSlice.payload);
  //* html section
  if (isLoggedIn) {
    console.log(isAdmin && payload && payload.isAdmin);
    if (
      (payload && payload.isAdmin === isAdmin) ||
      (payload && payload.biz === isBiz)
    ) {
      return element;
    }
  }
  toast.error("Invalid Permissions");
  return <Navigate to={ROUTES.LOGIN} />;
};
export default SuperProtectedRoute;

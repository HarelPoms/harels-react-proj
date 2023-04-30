import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

//isBizOrAdmin - False = regular, True = Biz/Admin
const PermissionsProtectedRoute = ({ element, isAdmin, isBiz, isBizOrAdmin }) => {
  //* logic section
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  const payload = useSelector((bigState) => bigState.authSlice.payload);
  const adminOrBizCheck = () =>{
    return (payload && payload.isAdmin && isAdmin) || (payload && payload.biz && isBiz);
  }
  const regularUserCheck = () => {
    return (payload && payload.isAdmin === isAdmin) || (payload && payload.biz === isBiz);
  }
  //* html section
  if (isLoggedIn) {
    if(isBizOrAdmin && adminOrBizCheck()){
      return element;
    }
    else if (!isBizOrAdmin && regularUserCheck()){
      return element;
    }
  }
  toast.error("Invalid Permissions");
  return <Navigate to={ROUTES.LOGIN} />;
};


PermissionsProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isBiz:   PropTypes.bool.isRequired,
    isBizOrAdmin: PropTypes.bool.isRequired,
};

PermissionsProtectedRoute.defaultProps = {
    isAdmin: false,
    isBiz: false,
    isBizOrAdmin: false
};
export default PermissionsProtectedRoute;

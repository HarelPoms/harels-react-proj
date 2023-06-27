import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import jwt_decode from "jwt-decode";
const useLoggedIn = () => {
  const dispatch = useDispatch();
  return async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      let { data } = await axios.get("/users/userInfo");
      if (!data) {
        localStorage.clear();
        throw "invalid token";
      }
      const payload = jwt_decode(token);
      dispatch(authActions.login(payload));
    } catch (err) {
      //server error
      //invalid token
    }
  };
};

export default useLoggedIn;

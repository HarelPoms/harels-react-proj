import { Fragment } from "react";
import NavLinkComponent from "./NavLinkComponent";
import { useDispatch, useSelector } from "react-redux";
import ROUTES from "../../routes/ROUTES";
import { authActions } from "../../store/auth";

//not logged in users
const notAuthPages = [
    {
        label: "Register",
        url: ROUTES.REGISTER,
    },
    {
        label: "Login",
        url: ROUTES.LOGIN,
    },
];

//logged in users
const authedPages = [
    {
        label: "Profile",
        url: ROUTES.PROFILE,
    },
    {
        label: "Logout",
        url: ROUTES.LOGOUT,
    }
];

const NavbarAuthNotAuthLinks = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(
    (bigPie) => bigPie.authSlice.isLoggedIn
    );
    const logoutClick = () => {
        localStorage.clear();
        dispatch(authActions.logout());
    };
    return (
    <Fragment>
        {isLoggedIn
            ? authedPages.map((page) =>
            page.url === ROUTES.LOGOUT ? (
                <NavLinkComponent
                    key={page.url}
                    {...page}
                    onClick={logoutClick}
                    />) :
                    (<NavLinkComponent key={page.url} {...page} />)
                )
                : notAuthPages.map((page) => (
                    <NavLinkComponent key={page.url} {...page} />
        ))}
    </Fragment>)
}

export default NavbarAuthNotAuthLinks;
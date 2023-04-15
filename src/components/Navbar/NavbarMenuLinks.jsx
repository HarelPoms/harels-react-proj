import NavLinkComponent from "./NavLinkComponent";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";

import ROUTES from "../../routes/ROUTES";
import { authActions } from "../../store/auth";

// access to all
const pages = [
    {
        label: "Home",
        url: ROUTES.HOME,
    },
];

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
    },
    {
        label: "My Cards",
        url: ROUTES.MYCARDS
    }
];

//Biz pages
const bizPages = [
    {label: "Create", url:ROUTES.NEWCARD},
];

const NavbarMenuLinks = () => {
    const dispatch = useDispatch();
    const payload = useSelector((bigPie) => bigPie.authSlice.payload);
    const isLoggedIn = useSelector(
    (bigPie) => bigPie.authSlice.isLoggedIn
    );

    const logoutClick = () => {
        localStorage.clear();
        dispatch(authActions.logout());
    };
    return (
        <Fragment>
        {pages.map((page) => (
            <NavLinkComponent key={page.url} {...page} />
        ))}
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
                {payload && payload.biz ? bizPages.map((page) => (
                    <NavLinkComponent key={page.url} {...page} />
                )) : ""}
                </Fragment>
            );
}

export default NavbarMenuLinks;
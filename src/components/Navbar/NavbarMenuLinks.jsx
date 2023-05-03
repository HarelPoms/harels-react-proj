import NavLinkComponent from "./NavLinkComponent";
import { useSelector } from "react-redux";
import { Fragment } from "react";

import ROUTES from "../../routes/ROUTES";
import NavbarNotAuthLinks from "./NavbarNotAuthLinks";

// access to all
const pages = [
    {
        label: "Home",
        url: ROUTES.HOME,
    },
    {
        label: "About Us",
        url: ROUTES.ABOUT
    }
];

//Biz pages
const bizPages = [
    {label: "Create", url:ROUTES.NEWCARD},
    {
        label: "My Cards",
        url: ROUTES.MYCARDS
    }
];

const adminPages = [
    {label: "Sandbox", url: ROUTES.SANDBOX}
]

const loggedInPages  = [{label: "Favorite Cards", url: ROUTES.MYFAVS}];

const NavbarMenuLinks = ({isMobile}) => {
    const payload = useSelector((bigPie) => bigPie.authSlice.payload);
    const isLoggedIn = useSelector(
    (bigPie) => bigPie.authSlice.isLoggedIn
    );

    return (
        <Fragment>
        {pages.map((page) => (
            <NavLinkComponent key={page.url} {...page} />
        ))}
        {isMobile ? <NavbarNotAuthLinks /> : 
        ""}
        {payload && payload.biz ? bizPages.map((page) => (
            <NavLinkComponent key={page.url} {...page} />
        )) : ""}
        {payload && payload.isAdmin ? adminPages.map((page) => (
            <NavLinkComponent key={page.url} {...page} />
        )) : ""}
        {isLoggedIn ? loggedInPages.map((page) => (
            <NavLinkComponent key={page.url} {...page} />
        )) : ""}
        </Fragment>
        );
}

export default NavbarMenuLinks;
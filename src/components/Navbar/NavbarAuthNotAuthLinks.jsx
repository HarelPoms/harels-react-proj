import { Fragment } from "react";
import ROUTES from "../../routes/ROUTES";
import NavLinkComponent from "./NavLinkComponent";

const NavbarAuthNotAuthLinks = ({authedPages, notAuthPages, isLoggedIn, logoutClick}) => {
    const handleLogoutClick = ()=> {
        logoutClick();
    }
    return (
    <Fragment>
        {isLoggedIn
            ? authedPages.map((page) =>
            page.url === ROUTES.LOGOUT ? (
                <NavLinkComponent
                    key={page.url}
                    {...page}
                    onClick={handleLogoutClick}
                    />) :
                    (<NavLinkComponent key={page.url} {...page} />)
                )
                : notAuthPages.map((page) => (
                    <NavLinkComponent key={page.url} {...page} />
        ))}
    </Fragment>)
}

export default NavbarAuthNotAuthLinks;
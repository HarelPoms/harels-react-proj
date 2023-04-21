import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

const SandboxPage = () => {
    return (
        <Fragment>
            <h1>Sandbox Page</h1>
            <Link to="/sandbox/nr">Nested Route Page</Link> |
            <Link to="/sandbox/rrp">Rerender Pages</Link> |
            <Link to="/sandbox/rp1">Redux Page 1</Link> |
            <Link to="/sandbox/rp2">Redux Page 2</Link> | 
            <Outlet />
        </Fragment>
    
    );
}

export default SandboxPage;
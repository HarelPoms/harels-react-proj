import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

const SandboxPage = () => {
    return (
        <Fragment>
            <h1>Sandbox Page</h1>
            <Link to="/nr/nestedpage1">Nested Route Page</Link> |
            <Link to="/nr/nestedpage2">Rerender Pages</Link> |
            <Link to="/nr/nestedpage2">Redux Page 1</Link> |
            <Link to="/nr/nestedpage2">Redux Page 2</Link> | 
            <Outlet />
        </Fragment>
    
    );
}

export default SandboxPage;
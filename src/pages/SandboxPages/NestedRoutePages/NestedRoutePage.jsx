import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

const NestedRoutePage = () => {
  return (
    <Fragment>
      <h1>Nested page</h1>
      <Link to="/nr/nestedpage1">Nested Page 1</Link> |
      <Link to="/nr/nestedpage2">Nested Page 2</Link>
      <Outlet />
    </Fragment>
  );
};

export default NestedRoutePage;

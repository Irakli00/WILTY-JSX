import { Outlet } from "react-router-dom";
import RouteChangeListener from "../components/RouteChangeListener";

function RootLayout() {
  return (
    <>
      <RouteChangeListener />
      <Outlet />
    </>
  );
}

export default RootLayout;

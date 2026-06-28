import { Outlet } from "react-router-dom";
import CursorGlow from "../Component/CursorGlow";

function Layout() {
  return (
    <>
      <CursorGlow />

      <div className="relative z-10">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
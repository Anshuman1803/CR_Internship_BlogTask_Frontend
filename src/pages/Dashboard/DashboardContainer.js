import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate, NavLink } from "react-router-dom";
import LOGO from "../../Assets/LOGO.png";
import { useSelector, useDispatch } from "react-redux";
import { UserLoggedOut } from "../../Redux/ReduxSlice";
import GenerategreetingMsg from "../../helpers/GreetingMsg";
function DashboardContainer() {
  const { IsActive, currentUser } = useSelector((state) => state.BlogApp);
  const { pathname } = useLocation();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!IsActive) {
      navigateTo("/");
      return;
    } else if (pathname === "/user/dashboard") {
      navigateTo("/user/dashboard/profile");
    }
  }, [pathname, navigateTo, IsActive]);
  return (
    <section className="dashboardContainer">
      <aside className="Dashboard__sidebar">
        <div className="Dashboardsidebar__LogoContainer">
          <img
            src={LOGO}
            alt="AppLOGO"
            className="Dashboardsidebar__Logo"
            loading="lazy"
          />
        </div>

        <NavLink
          to={`/user/dashboard/profile`}
          className="DashboardSidebar_links"
        >
          {" "}
          Profile
        </NavLink>

        <NavLink
          to={`/user/dashboard/create-blog`}
          className="DashboardSidebar_links"
        >
          {" "}
          Create blog
        </NavLink>

        <NavLink
          to={`/user/dashboard/update-blog`}
          className="DashboardSidebar_links"
        >
          {" "}
          Update blog
        </NavLink>

        <NavLink
          to={`/user/dashboard/update-password`}
          className="DashboardSidebar_links"
        >
          {" "}
          Update password
        </NavLink>

        <button
          className="DashboardSidebar__button"
          onClick={() => dispatch(UserLoggedOut(false))}
        >
          Log out
        </button>
      </aside>
      <div className="Dashboard__outletContainer">
        <h1 className="Dashboard_outletContainer__heading">
          <span className="Dashboard__greetingMSG">{GenerategreetingMsg()}</span>{currentUser.user.split(" ")[0]}
        </h1>
        <Outlet />
      </div>
    </section>
  );
}

export default DashboardContainer;

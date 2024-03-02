import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserLoggedOut } from "../Redux/ReduxSlice";
function Navbar() {
  const dispatch = useDispatch();
  const { IsActive } = useSelector((state) => state.BlogApp);
  const navigateTO = useNavigate();
  const handleLoginNavigateClick = (e) => {
    navigateTO("/user/Log-In");
  };
  return (
    <div className="AppNavbar__Container">
      <nav className="App_navbar">
        <NavLink to="/" className="AppNavbar__Item">
          Home
        </NavLink>
        <NavLink to="/blogs" className="AppNavbar__Item">
          Blogs
        </NavLink>
      </nav>

      {!IsActive && (
        <button
          className="AppNavbar__button"
          onClick={handleLoginNavigateClick}
        >
          Log in
        </button>
      )}

      {IsActive && (
        <div className="DropDownMenu_Container">
          <span className="CurrentUserName__FLetter">U</span>
          <div className="dropDownMENU">
            <Link className="dropDownMENU__Item" to={"/user/dashboard"}>
              Dashboard{" "}
              <i className="fa-solid fa-user-tie dropDownMENUItem__ICON"></i>
            </Link>
            <button
              className="dropDownMENU__Item"
              onClick={() => dispatch(UserLoggedOut(false))}
            >
              Log out
              <i className="fa-solid fa-right-from-bracket dropDownMENUItem__ICON"></i>
            </button>
          </div>
        </div>
      )}
      <i className="fa-solid fa-bars appHeader__HamMenu"></i>
    </div>
  );
}

export default Navbar;

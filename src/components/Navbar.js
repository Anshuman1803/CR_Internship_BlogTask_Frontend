import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserLoggedOut } from "../Redux/ReduxSlice";
function Navbar() {
  const dispatch = useDispatch();
  const { IsActive } = useSelector((state) => state.BlogApp);

  const handleHamMenuClick = (e) => {
    const navbar = document.querySelector(".App_navbar");
    const hamMenu = document.querySelector('.appHeader__HamMenu')
    navbar.classList.toggle("mobileNavbar");
    hamMenu.classList.toggle("fa-xmark")
  };

  return (
    <div className="AppNavbar__Container">
      <nav className="App_navbar mobileNavbar">
        <NavLink to="/" className="AppNavbar__Item">
          Home
        </NavLink>
        <NavLink to="/blogs" className="AppNavbar__Item">
          Blogs
        </NavLink>
      </nav>

      {IsActive && (
        <div className="DropDownMenu_Container">
          <i className="fa-solid fa-user-secret CurrentUser_ICON"></i>
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
      <i
        className="fa-solid fa-bars appHeader__HamMenu"
        onClick={handleHamMenuClick}
      ></i>
    </div>
  );
}

export default Navbar;

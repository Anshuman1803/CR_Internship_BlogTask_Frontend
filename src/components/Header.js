import React from "react";
import Navbar from "./Navbar";
import LOGO from "../Assets/LOGO.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="App__header">
      <Link to={"/"} className="Header__LOGOContainer">
        <img
          src={LOGO}
          alt="App_LOGO"
          className="Header_appLOGO"
          loading="lazy"
        />
      </Link>
      <Navbar />
    </header>
  );
}

export default Header;

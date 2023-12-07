import "./Navbar.css";
import React, { useState } from "react";
import { MenuItems } from "./MenuItems";
import SearchPlace from "../../../common_components/SearchPlace";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  
  const navigate = useNavigate();

  function handleNavigateLogin() {
    navigate("/login");
  }

  function handleNavigateSignUp() {
    navigate("/signup");
  } 

  return (
    <div className="navSearch">
      <nav className="NavbarItems">
        <h1 className="navbarLogo">
          <a href="/">
            <img src="./logo.png" className="Logo" alt="GoBooking-logo" />
            Gobooking
          </a>
        </h1>
        <div
          className="smallMenuIcons"
          onClick={() => setClicked((clicked) => !clicked)}
        >
          <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <ul className={clicked ? "navMenu active" : "navMenu"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a
                  className={item.cName}
                  href={item.url}
                  onClick={() =>
                    setSearchClicked((searchClicked) => !searchClicked)
                  }
                >
                  <i className={item.icon}></i>
                  {item.title}
                </a>
              </li>
            );
          })}
          <div className="navBarButtons">
            <button className="loginButton" onClick={handleNavigateLogin}>Login</button>
            <button className="signupButton" onClick={handleNavigateSignUp}>Sign Up</button>
          </div>
        </ul>
      </nav>
      <SearchPlace searchClicked={searchClicked} />
    </div>
  );
}
export default Navbar;

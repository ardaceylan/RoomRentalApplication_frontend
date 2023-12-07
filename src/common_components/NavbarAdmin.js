import "./NavbarAppUser.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [clicked, setClicked] = useState(false);  

  const navigate = useNavigate();

  function handleLogOut() {
    navigate("/");
  }
  return (
    <div className="navSearchAU">
      <nav className="NavbarItemsAU">
        <h1 className="navbarLogoAU">
          <a href="/">
            <img src="./logo.png" className="logoAU" alt="GoBooking-logo" />
            Gobooking
          </a>
        </h1>        
        <div className="menuAU">
          <div
            className="menu_iconAU"
            onClick={() => setClicked((clicked) => !clicked)}
          >
            <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          {clicked && (
            <ul className="navbar-dropdown-menu">                           
              <li className="navbar-dropdown-item" onClick={handleLogOut}>Log out</li>
            </ul>
          )}
        </div>
      </nav>      
    </div>
  );
}
export default Navbar;

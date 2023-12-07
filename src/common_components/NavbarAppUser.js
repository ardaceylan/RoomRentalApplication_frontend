import "./NavbarAppUser.css";
import React, { useState } from "react";
import SearchPlace from "./SearchPlace";
import { useNavigate } from "react-router-dom";

function Navbar({ id, onFilterChange} ) {
  const [clicked, setClicked] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);

  const handleFilterChange = (newFilters) => {
    onFilterChange(newFilters);
  };  

  const navigate = useNavigate();

  function handleLogOut() {
    navigate("/");
  }
  function handleMP() {
    navigate(`/my_profile/${id}`);
  }
  function handleMProp() {
    navigate(`/my_properties/${id}`);
  }
  function handleMB() {
    navigate(`/my_bookings/${id}`);
  }
  function handleMW() {
    navigate(`/my_wallet/${id}`);
  }

  return (
    <div className="navSearchAU">
      <nav className="NavbarItemsAU">
        <h1 className="navbarLogoAU">
          <a href={`/property_search/${id}`}>
            <img src="../logo.png" className="logoAU" alt="GoBooking-logo" />
            Gobooking
          </a>
        </h1>
        <div className="navbar-searchAU">
          <a
            className="navLinksAU"
            onClick={() => setSearchClicked((searchClicked) => !searchClicked)}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
            Search For Places
          </a>
        </div>
        <div className="menuAU">
          <div
            className="menu_iconAU"
            onClick={() => setClicked((clicked) => !clicked)}
          >
            <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          {clicked && (
            <ul className="navbar-dropdown-menu">
              <li className="navbar-dropdown-item" onClick={handleMP}>My Profile</li>
              <li className="navbar-dropdown-item" onClick={handleMProp}>My Properties</li>
              <li className="navbar-dropdown-item" onClick={handleMB}>My Bookings</li>
              <li className="navbar-dropdown-item" onClick={handleMW}>My Wallet</li>
              <li className="navbar-dropdown-item" onClick={handleLogOut}>Log out</li>
            </ul>
          )}
        </div>
      </nav>
      <SearchPlace searchClicked={searchClicked} onFilterChange={handleFilterChange}/>
    </div>
  );
}
export default Navbar;

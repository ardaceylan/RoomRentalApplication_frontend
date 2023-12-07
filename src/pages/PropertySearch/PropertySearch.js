import "./PropertySearch.css";
import React, { useState } from "react";
import Footer from "../../common_components/Footer";
import Navbar from "../../common_components/NavbarAppUser";
import PlaceList from "../Home/components/PlaceList";
import { useParams } from 'react-router-dom';

function PropertySearch() {
  const { id } = useParams();
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };  

  console.log("user_id", id);
  return (
    <div className="PropertySearch">
      <Navbar id={id} onFilterChange={handleFilterChange}/>      
      <PlaceList heading="Places" city={filters.city} maxGuests={filters.maxGuests} type={filters.type} user_id={id}/>
      <Footer/>
    </div>
  );
}
export default PropertySearch;

import "./PlaceList.css";
import React, { useState, useEffect } from "react";
import PlaceSmall from "./PlaceSmall";
import { useNavigate } from "react-router-dom";
import Review from "../../Review/Review";
import Divider from "@mui/material/Divider";

function PlaceList(props) {
  const { heading, city, maxGuests, type, user_id } = props;
  const [property, setProperty] = useState([]);
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();    

  useEffect(() => {
    setFilters({ city, maxGuests, type });
  }, [city, maxGuests, type]);
  
  useEffect(() => {
    const fetchProperty = async () => {     
      let path;
  
      if (filters.city && filters.maxGuests && filters.type !== "ALL") {      
        console.log("city " + filters.city + " max guests " + filters.maxGuests + " type " + filters.type);
        path = `http://localhost:8080/gobooking/property/getbyfiltering?city=${filters.city}&maxGuests=${filters.maxGuests}&type=${filters.type}`;
      } else if (filters.city && filters.maxGuests && filters.type === "ALL") {
        console.log("city " + filters.city + " max guests " + filters.maxGuests);
        path = `http://localhost:8080/gobooking/property/getbyfiltering?city=${filters.city}&maxGuests=${filters.maxGuests}`;
      } else if (filters.maxGuests && filters.type !== "ALL") {
        console.log("max guests " + filters.maxGuests + " type " + filters.type);
        path = `http://localhost:8080/gobooking/property/getbyfiltering?maxGuests=${filters.maxGuests}&type=${filters.type}`;
      } else if (filters.maxGuests && filters.type === "ALL") {
        console.log("max guests " + filters.maxGuests);
        path = `http://localhost:8080/gobooking/property/getbyfiltering?maxGuests=${filters.maxGuests}`;
      } else {
        console.log("default");
        path = "http://localhost:8080/gobooking/property";
      }
      
      try {
        const response = await fetch(path);
        const data = await response.json();
        setProperty(data);
        console.log(data);
      } catch (error) {
        console.log("Error fetching balance:", error);
      }
    }; 
    if (Object.keys(filters).length !== 0) {
      fetchProperty();
    }
  }, [filters]);      

  const handleClick = (id, user_id) => {
    console.log("In handleClick userid, propertyid:", user_id, id);
    navigate(`/property_details/${user_id}/${id}`);
  };

  return (
    <div className="placeList">
      <h1>{heading}</h1>
      <div className="places">
        {property && property.length > 0 ? (
            property.map((item) => (
                <div key={item.id}>
                  <PlaceSmall
                      key={item.id}
                      id={item.id}
                      handleClick={handleClick}
                      image="../images/house4.jpg"
                      title={item.title}
                      pricePerNight={item.price_per_night}
                      rate={item.rating}
                      location={
                          item.neighborhood + ", " + item.district + ", " + item.city
                      }
                      guests={item.max_people}
                      placeType={item.room_number + "+" + item.bathroom_number}
                      rentalType={item.type}
                      user_id={user_id}
                  />
                </div>
            ))
        ) : (
            <p>No properties</p>
        )}
      </div>
    </div>
  );
}
export default PlaceList;
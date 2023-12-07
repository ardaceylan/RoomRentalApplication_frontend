import "./PlaceList.css";
import React, { useState, useEffect } from "react";
import PlaceSmall from "./PlaceSmall";
import { useNavigate } from "react-router-dom";
import Review from "../../Review/Review";
import Divider from "@mui/material/Divider";

function PlaceListHome(props) {
  const [property, setProperty] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const response = await fetch("http://localhost:8080/gobooking/property");
      const data = await response.json();
      setProperty(data);
    } catch (error) {
      console.log("Error fetching balance:", error);
    }
  };

  const handleClick = (id) => {
    navigate("/login");
    console.log("Clicked on property with id:", id);
  };

  return (
    <div className="placeList">
      <h1>{props.heading}</h1>
      <div className="places">
        {property && property.length > 0 ? (
            property.map((item) => (
                <div key={item.id}>
                  <PlaceSmall
                      key={item.id}
                      id={item.id}
                      handleClick={handleClick}
                      image="./images/house4.jpg"
                      title={item.title}
                      pricePerNight={item.price_per_night}
                      rate={item.rating}
                      location={
                          item.neighborhood + ", " + item.district + ", " + item.city
                      }
                      guests={item.max_people}
                      placeType={item.room_number + "+" + item.bathroom_number}
                      rentalType={item.type}
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
export default PlaceListHome;
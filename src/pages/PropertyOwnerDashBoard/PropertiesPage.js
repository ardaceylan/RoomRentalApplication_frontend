import React, { useEffect, useState } from "react";
import Footer from "../../common_components/Footer";
import Navbar from "../../common_components/NavbarAppUser";
import MyBookingSingle from "../Home/components/MyBookingSingle";
import { useNavigate, useParams } from "react-router-dom";

function Properties() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState([]);
  const [reviewData, setReviewData] = useState([]);

  function handleNavigateAP() {
    navigate(`/add_property/${id}`);
  }

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/gobooking/property/getbyownerid/${id}`
      );
      const data = await response.json();
      console.log(data);
      setProperty(data);
    } catch (error) {
      console.log("Error fetching balance:", error);
    }
  };

  const handleClick = (property_id) => {
    navigate(`/edit_property/${id}/${property_id}`);
    console.log("Clicked on property with id:", property_id);
  };

  return (
    <div>
      <Navbar id={id} />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="PropertiesPage">
        <div className="apbutton"></div>
        <button className="addPropButton" onClick={handleNavigateAP}>
          Add Property
        </button>
        <div className="places">
          {property &&
            property.map((item, index) => {
              return (
                <MyBookingSingle
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
                />
              );
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Properties;

import React, { useEffect, useState } from "react";
import PropertyDetailsPage from "./PropertyDetailsPage";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../common_components/Footer";
import Navbar from "../../common_components/NavbarAppUser";

const PropertyScreen = () => {
  const [property, setProperty] = useState(null);
  const { user_id, property_id } = useParams();
  console.log("useParams:", useParams());
  console.log("property screen user_id, id" + user_id, property_id);

  useEffect(() => {
    fetchProperty(property_id);
  }, [property_id]);

  const fetchProperty = async (property_id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/gobooking/property/${property_id}`
      );
      const data = response.data;
      setProperty(data);
    } catch (error) {
      console.error("Error fetching property:", error);
    }
  };

  return (
    <div>
      <Navbar id={user_id}/>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="property-screen">
        {property ? (
          <PropertyDetailsPage property={property} user_id={user_id} />
        ) : (
          <div className="empty">
            <h2>No Property Found!</h2>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PropertyScreen;

import "./AddPropertyPage.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../common_components/Footer";
import Navbar from "../../common_components/NavbarAppUser";

const services = [
  { id: "wifi", label: "WiFi" },
  { id: "kitchen", label: "Kitchen" },
  { id: "furnished", label: "Furnished" },
  { id: "parking", label: "Parking" },
  { id: "ac", label: "AC" },
  { id: "elevator", label: "Elevator" },
  { id: "fireAlarm", label: "Fire Alarm" },
];

function AddPropertyPage() {
  const { user_id, property_id } = useParams();
  const [property, setProperty] = useState({
    title: "",
    max_people: "",
    room_number: "",
    bathroom_number: "",
    description: "",
    price_per_night: "",
    type: "HOUSE",
    owner_id: user_id,
    city: "",
    district: "",
    neighborhood: "",
    buildingNo: "",
    apartmentNo: "",
    floor: "",
    wifi: false,
    kitchen: false,
    furnished: false,
    parking: false,
    ac: false,
    elevator: false,
    fire_alarm: false,
  });

  const navigate = useNavigate();

  function handleNavigateMP() {
    navigate(`/my_properties/${user_id}`);
  }


  useEffect(() => {
    fetchReviewData(property_id);
  }, [property_id]);

  const fetchReviewData = async (property_id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/gobooking/property/${property_id}`
      );
      setProperty(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [availableDateRange, setAvailableDateRange] = useState([null, null]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handleAddProperty = () => {
    const newProperty = {
      ...property,
      max_people: parseInt(property.max_people),
      room_number: parseInt(property.room_number),
      bathroom_number: parseInt(property.bathroom_number),
      price_per_night: parseInt(property.price_per_night),
      buildingNo: parseInt(property.buildingNo),
      apartmentNo: parseInt(property.apartmentNo),
      floor: parseInt(property.floor),
    };

    const numericAttributes = ["max_people", "room_number", "bathroom_number", "price_per_night", "buildingNo", "apartmentNo", "floor"];
    for (const attribute of numericAttributes) {
      const value = parseInt(property[attribute]);
      if (isNaN(value) || value < 0) {
        alert(`"${attribute}" must be a non-negative numeric value.`);
        return; // Exit the function if any attribute has a negative value or is NaN
      }
    }

    // Send a POST request to your backend
    fetch(`http://localhost:8080/gobooking/property/${property_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProperty),
    }).catch((error) => {
      // Handle any errors that occurred during the request
      console.error(error);
    });
    handleNavigateMP();
  };

  const handleServiceChange = (e) => {
    const serviceId = e.target.id;
    setProperty((prevProperty) => ({
      ...prevProperty,
      [serviceId]: e.target.checked,
    }));
  };

  const handlePropertyTypeChange = (e) => {
    const selectedType = e.target.value;
    const updatedProperty = { ...property, type: selectedType };

    if (selectedType === "ROOM") {
      updatedProperty.room_number = 1;
    }

    setProperty(updatedProperty); // Update the property state
  };

  const handlePhotoChange = (e) => {
    //const files = Array.from(e.target.files);
    //setSelectedPhotos(files);
  };

  return (
    <div>
      <Navbar id={user_id}/>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="container">
        <label htmlFor="property-type">Property Type:</label>
        <select
          id="property-type"
          value={property.type}
          onChange={handlePropertyTypeChange}
        >
          <option value="HOUSE">HOUSE</option>
          <option value="ROOM">ROOM</option>
        </select>

        <label htmlFor="address">Address:</label>
        <div className="address-container">
          <input
            type="text"
            id="city"
            value={property.city}
            onChange={(e) => setProperty({ ...property, city: e.target.value })}
            placeholder="City"
          />
          <input
            type="text"
            id="district"
            value={property.district}
            onChange={(e) =>
              setProperty({ ...property, district: e.target.value })
            }
            placeholder="District"
          />
          <input
            type="text"
            id="neighborhood"
            value={property.neighborhood}
            onChange={(e) =>
              setProperty({ ...property, neighborhood: e.target.value })
            }
            placeholder="Neighborhood"
          />
          <input
            type="number"
            id="buildingNo"
            value={property.buildingNo}
            onChange={(e) =>
              setProperty({ ...property, buildingNo: e.target.value })
            }
            placeholder="Building Number"
          />
          <input
            type="number"
            id="apartmentNo"
            value={property.apartmentNo}
            onChange={(e) =>
              setProperty({ ...property, apartmentNo: e.target.value })
            }
            placeholder="Apartment Number"
          />
          <input
            type="number"
            id="floor"
            value={property.floor}
            onChange={(e) =>
              setProperty({ ...property, floor: e.target.value })
            }
            placeholder="Floor"
          />
        </div>

        <label htmlFor="title">Title:</label>
        <textarea
          id="title"
          value={property.title}
          onChange={(e) => setProperty({ ...property, title: e.target.value })}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={property.price_per_night}
          onChange={(e) =>
            setProperty({ ...property, price_per_night: e.target.value })
          }
        />

        <label htmlFor="maxCount">Max People to Stay:</label>
        <input
          type="number"
          id="maxCount"
          value={property.max_people}
          onChange={(e) =>
            setProperty({ ...property, max_people: e.target.value })
          }
        />

        <label htmlFor="roomCount">Room Number:</label>
        <input
          type="number"
          id="roomCount"
          value={property.room_number}
          onChange={(e) =>
            setProperty({ ...property, room_number: e.target.value })
          }
          disabled={property.type === "ROOM"}
        />

        <label htmlFor="bathroomCount">Bathroom Number:</label>
        <input
          type="number"
          id="bathroomCount"
          value={property.bathroom_number}
          onChange={(e) =>
            setProperty({ ...property, bathroom_number: e.target.value })
          }
        />

        <label>Services Provided:</label>
        <div className="services-container">
          {services.map((service) => (
            <div key={service.id}>
              <input
                type="checkbox"
                id={service.id}
                checked={property[service.id]}
                onChange={handleServiceChange}
              />
              <label htmlFor={service.id}>{service.label}</label>
            </div>
          ))}
        </div>

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={property.description}
          onChange={(e) =>
            setProperty({ ...property, description: e.target.value })
          }
        />

        <label htmlFor="photos">Photos:</label>
        <input type="file" id="photos" multiple onChange={handlePhotoChange} />

        <button
          onClick={() => {
            handleAddProperty();            
          }}
          className={"button-addProperty"}
        >
          Edit Property
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default AddPropertyPage;

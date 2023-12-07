import "./MyBookingSingle.css";
import React from "react";
import axios from 'axios';

function MyBookingSingle(props) {
  const { id, handleClick } = props;

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/gobooking/property/${id}`);
      console.log(response.data); // Log the response data if needed
      alert(`"${id}" deleted.`);
    } catch (error) {
      console.error(error);
    }
  };  

  return (
    <div className="placeSmall">
      <div className="placeImage" onClick={() => handleClick(id)}>
        <img src={props.image} alt="image1" />
      </div>
      <div className="placeInfo">
        <div className="price flex">
          <h4 className="Title">{props.title}</h4>
          <h4 className="rate">
            <i class="fa-sharp fa-solid fa-star"></i>
            {props.rate}
          </h4>
        </div>
        <p className="unitPrice">
          <i class="fa-solid fa-money-bill-wave"></i> &#8378;
          {props.pricePerNight} per night
        </p>
        <p>
          <i class="fa-solid fa-person"></i> {props.guests}
        </p>
        <p>
          <i class="fa-sharp fa-solid fa-building"></i> {props.placeType} /{" "}
          {props.rentalType}
        </p>
        <p>
          <i class="fa-sharp fa-solid fa-location-dot"></i> {props.location}
        </p>
        <div className="deleteContMP">
          <button className="deleteButtonMP" onClick={() => handleDelete(id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
export default MyBookingSingle;

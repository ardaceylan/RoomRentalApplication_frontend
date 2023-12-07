import "./PlaceSmall.css";
import React from "react";

function PlaceSmall(props) {

  const { id, handleClick } = props;
  console.log("props.id ,props.user_id: ",props.id, props.user_id)
  return (
    <div className="placeSmall" onClick={() => props.handleClick(props.id, props.user_id)}>
      <div className="placeImage">
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
          <i class="fa-sharp fa-solid fa-building"></i> {props.placeType} / {props.rentalType}
        </p>
        <p>
          <i class="fa-sharp fa-solid fa-location-dot"></i> {props.location}
        </p>
      </div>
    </div>
  );
}
export default PlaceSmall;

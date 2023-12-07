import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './PropertyDetailsPage.css';
import ReviewList from "../Review/ReviewList";
import { useParams } from 'react-router-dom';

const PropertyDetailsPage = ({ property }) => {
  
  const {user_id, id } = useParams();
  console.log("in propery detail:", user_id);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const calculateTotalPrice = (startDate, endDate, pricePerNight) => {
    const numDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    return numDays * pricePerNight;
  };

  const handleMakeReservation = () => {
    if (!startDate || !endDate) {
      alert('Please fill in all the fields.');
      return;
    }

    setShowConfirmation(true); // Show the confirmation dialog
  };

  const confirmReservation = () => {
    const pricePerNight = property.price_per_night;
    const bookingData = {
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      status: 'booked',
      booker_id: user_id,
      property_id: property.id,
      total_price: calculateTotalPrice(startDate, endDate, pricePerNight),
    };

    fetch('http://localhost:8080/gobooking/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
        .then((response) => {
          if (response.ok) {
            alert('Your reservation has been made.');
            setStartDate(null);
            setEndDate(null);

            setShowConfirmation(false); // Close the confirmation dialog

            // Update the property status and other details
            //fetch(`http://localhost:8080/gobooking/property/${property.id}?status=${"ACTIVE"}`, {
            //  method: 'PUT',
            //  headers: {
            //    'Content-Type': 'application/json',
            //  },
            //  body: JSON.stringify({
            //    title: property.title,
            //    status: 'ACTIVE',
            //    description: property.description,
            //  }),
            //})
                //.then((response) => {
                //  if (!response.ok) {
                //    throw new Error('Failed to update the property details.');
                //  }
                //})
                //.catch((error) => {
                //  console.error('Error updating property details:', error);
                //  alert('Failed to update the property details. Please try again.');
                //});
          } else {
            response.text().then((message) => {
              if (response.status === 409) {
                if (message === 'User Do Not Have Enough Money') {
                  alert('User does not have enough money. Please add funds before making a reservation.');
                }
                else {
                  alert('Booking overlaps with an existing booking. Please choose different dates.');
                }
              }
              else {
                throw new Error('Failed to make the reservation.');
              }
            });
          }
        })
        .catch((error) => {
          console.error('Error making reservation:', error);
          alert('Failed to make the reservation. Please try again.');
        });
  };



  const cancelReservation = () => {
    setShowConfirmation(false); // Close the confirmation dialog
  };

  return (
      <div className="container">
        <h1 className="property-title">{property.title}</h1>
        <img src="../../images/house4.jpg" alt="House" className="house-image" />
        <div className="property-details">
          <div className="property-description">
            <h4 className="subheading">Description:</h4>
            <p className="description-text">{property.description}</p>
          </div>
          <div className="property-info">
            <h3 className="subheading">Property Details:</h3>
            <table className="info-table">
              <tbody>
              <tr>
                <td>Location:</td>
                <td>{property.city}, {property.district}, {property.neighborhood}</td>
              </tr>
              <tr>
                <td>Bedrooms:</td>
                <td>{property.room_number}</td>
              </tr>
              <tr>
                <td>Bathrooms:</td>
                <td>{property.bathroom_number}</td>
              </tr>
              <tr>
                <td>Max People:</td>
                <td>{property.max_people}</td>
              </tr>
              <tr>
                <td>Price per Night:</td>
                <td>${property.price_per_night}</td>
              </tr>
              <tr>
                <td>Building Number:</td>
                <td>{property.buildingNo}</td>
              </tr>
              <tr>
                <td>Apartment Number:</td>
                <td>{property.apartmentNo}</td>
              </tr>
              <tr>
                <td>Floor:</td>
                <td>{property.floor}</td>
              </tr>
              <tr>
                <td>Added Date:</td>
                <td>{new Date(property.added_date).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
              </tr>
              <tr>
                <td>Type:</td>
                <td>{property.type}</td>
              </tr>
              <tr>
                <td>Status:</td>
                <td>{property.status}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <ReviewList property_id={property.id} session_user_id={parseInt(user_id)}/>
          <div className="booking-form">
            <h3 className="subheading">Make a Reservation</h3>
            <div className="form-row">
              <label>Start Date:</label>
              <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={60}
                  timeCaption="Time"
                  dateFormat="MMMM d, yyyy HH:mm"
                  className="date-picker"
                  minDate={new Date()}
              />
            </div>
            <div className="form-row">
              <label>End Date:</label>
              <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={60}
                  timeCaption="Time"
                  dateFormat="MMMM d, yyyy HH:mm"
                  className="date-picker"
                  minDate={startDate}
              />
            </div>
            <button onClick={handleMakeReservation} className="reservation-button">Make Reservation</button>
          </div>
        </div>

        {showConfirmation && (
            <div className="confirmation-dialog">
              <h3 className="subheading">Confirm Reservation</h3>
              <p className="confirmation-text">Total Price: ${calculateTotalPrice(startDate, endDate, property.price_per_night)}</p>
              <div className="confirmation-buttons">
                <button onClick={confirmReservation} className="confirm-button">Confirm</button>
                <button onClick={cancelReservation} className="cancel-button">Cancel</button>
              </div>
            </div>
        )}
      </div>
  );
};

export default PropertyDetailsPage;



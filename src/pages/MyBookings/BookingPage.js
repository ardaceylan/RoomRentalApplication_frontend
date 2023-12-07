import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Footer from "../../common_components/Footer";
import Navbar from "../../common_components/NavbarAppUser";
import ReviewForm from "../Review/ReviewForm";
import axios from "axios";
import Review from "../Review/Review";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
const BookingPage = ({ bookerId }) => {
    const { id } = useParams();
  const [bookings, setBookings] = useState([]);
    const [pastBookings, setPastBookings] = useState([]);
    const [currentBookings, setCurrentBookings] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = () => {
        // Make API request to fetch bookings for the specified bookerId
        fetch(`http://localhost:8080/gobooking/bookings/thesameBooker's/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setBookings(data);
                filterBookings(data);
            })
            .catch((error) => {
                console.error('Error fetching bookings:', error);
            });
    };

    /*
    const fetchReviewData = async (bookingId) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/gobooking/review/by_booking/${bookingId}`
            );

            if (response.data && response.data.review_id) {
                // Response data is not empty
                return response.data.review_id;
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
        }
    };
     */

    const fetchReviewData = async (bookingId) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/gobooking/review/by_booking/${bookingId}`
            );

            if (response.data && response.data.review_id) {
                // Response data is not empty
                return response.data.review_id;
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const fetchAndRenderReviewData = (bookingId) => {
        fetchReviewData(bookingId)
            .then((reviewId) => {
                setReviews((prevReviews) => ({
                    ...prevReviews,
                    [bookingId]: reviewId,
                }));
            })
            .catch((error) => {
                console.error('Error fetching review data:', error);
            });
    };

    const filterBookings = (bookingsData) => {
        const now = new Date().toISOString();
        const past = bookingsData.filter((booking) => booking.end_date < now);
        const current = bookingsData.filter((booking) => booking.end_date >= now);
        setPastBookings(past);
        setCurrentBookings(current);

        // Fetch and render review data for each booking
        bookingsData.forEach((booking) => {
            if (booking.status.localeCompare("completed") === 0) {
                fetchAndRenderReviewData(booking.booking_id);
            }
        });
    };

    const handleCancelBooking = (appUserId, price, bookingId) => {
        // Make API request to update user's balance and delete booking
        fetch(`http://localhost:8080/gobooking/appuser/add_to_balance/${appUserId}?balance=${price}`, {
            method: 'PUT'
        })
            .then((response) => {
                if (response.ok) {
                    // Booking canceled successfully
                    Alert.alert('Booking Canceled', 'Price added to your account.');
                    // Make API request to delete booking
                    fetch(`http://localhost:8080/gobooking/bookings/${bookingId}`, {
                        method: 'DELETE'
                    })
                        .then((response) => {
                            if (response.ok) {
                                // Booking deleted successfully
                                fetchBookings(); // Fetch updated bookings
                            } else {
                                // Error deleting booking
                                Alert.alert('Error', 'Failed to delete the booking. Please try again.');
                            }
                        })
                        .catch((error) => {
                            console.error('Error deleting booking:', error);
                            Alert.alert('Error', 'Failed to delete the booking. Please try again.');
                        });
                } else {
                    // Error canceling booking
                    Alert.alert('Error', 'Failed to cancel the booking. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error canceling booking:', error);
                Alert.alert('Error', 'Failed to cancel the booking. Please try again.');
            });
    };

    const handleDeleteReview = (reviewId) => {
        axios.delete(`http://localhost:8080/gobooking/review/${reviewId}`)
            .then(() => {
                // Review deleted successfully
                // Update the reviews state to remove the deleted review
                setReviews((prevReviews) => {
                    const updatedReviews = { ...prevReviews };
                    delete updatedReviews[reviewId];
                    return updatedReviews;
                });

                window.location.reload();
            })
            .catch((error) => {
                console.error('Error deleting review:', error);
                Alert.alert('Error', 'Failed to delete the review. Please try again.');
            });
    };


    const renderBookingItem = ({ item }) => (
        <View style={styles.bookingItem}>
            <Text style={styles.bookingInfo}>Start Date: {(item.start_date).substring(0, 10)} ({(item.start_date).substring(11, 16)})</Text>
            <Text style={styles.bookingInfo}>End Date: {item.end_date.substring(0, 10)} ({(item.end_date).substring(11, 16)})</Text>
            <Text style={styles.bookingInfo}>Status: {item.status}</Text>
            <Text style={styles.bookingInfo}>Property ID: {item.property_id}</Text>
            <Text style={styles.bookingPrice}>Price: {item.total_price}</Text>
            {item.start_date > new Date().toISOString() && (


                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => handleCancelBooking(item.booker_id, item.total_price, item.booking_id)}
                >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
            )}
            {(reviews[item.booking_id] == null) ? (
                <></>
            ) : (
                <h4>Edit Review</h4>
            )}
            {
                (item.status.localeCompare("completed") === 0) && (reviews[item.booking_id] == null) && (
                    <h4>New Review</h4>
                )
            }
            
            {
                (item.status.localeCompare("completed") === 0) && (
                    <div>
                        <ReviewForm
                            bookingId={item.booking_id}
                            reviewerId={item.booker_id}
                            reviewId={reviews[item.booking_id]}
                            isEdit={reviews[item.booking_id] !== null}
                        />
                    </div>
                )}
            {reviews[item.booking_id] != null && (
                <button onClick={() => handleDeleteReview(reviews[item.booking_id])}>Delete Review</button>
            )}

        </View>
    );

    const renderSection = (title, data) => (
        <View>
            <Text style={styles.sectionTitle}>{title}</Text>
            <FlatList
                data={data}
                renderItem={renderBookingItem}
                keyExtractor={(item) => item.booking_id.toString()}
                contentContainerStyle={styles.sectionContent}
            />
        </View>
    );

  return (
    <div>
      <Navbar id={id}/>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <View style={styles.container}>
        <Text style={styles.title}>My Bookings</Text>
        {renderSection('Current Bookings', currentBookings)}
        {renderSection('Past Bookings', pastBookings)}
      </View>
      <Footer />
    </div>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F2F8FF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#333333',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333333',
    },
    sectionContent: {
        paddingBottom: 24,
    },
    bookingItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    bookingInfo: {
        fontSize: 16,
        marginBottom: 8,
        color: '#666666',
    },
    bookingPrice: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
        color: '#333333',
    },
    cancelButton: {
        backgroundColor: '#0841a2',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignSelf: 'flex-end',
    },
    cancelButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

});

export default BookingPage;

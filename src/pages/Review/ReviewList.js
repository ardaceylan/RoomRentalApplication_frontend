import Review from "./Review";
import Divider from "@mui/material/Divider";
import * as React from "react";
import List from "@mui/material/List";
import "../AdminDashboard/style.css";
import axios from "axios";
import ScrollListElement from "../AdminDashboard/components/ScrollListElement";
import house1 from "../AdminDashboard/components/images/house1.jpg";
import {useState} from "react";
import DropDown from "../AdminDashboard/components/DropDown";


const baseURL = "http://localhost:8080/gobooking";

function getAppUser(appUsers, userId) {
    if (appUsers.length === 0) {
        return {}; // or return a placeholder value
    }

    let res = null;
    appUsers.map((appUser) => {
        if (appUser.id === userId) {
            res = appUser;
        }
    });

    return res || {}; // Return the found user or an empty object if not found
}



function ReviewList(props) {

    const [selectedOption, setSelectedOption] = useState('Rating');

    const handleSelect = (eventKey) => {
        setSelectedOption(eventKey);
    };

    let sortMode = 0;

    let data = [];
    if (selectedOption === 'Likes') {
        sortMode = 1;
    } else if (selectedOption === 'Date') {
        sortMode = 2;
    } else if (selectedOption === 'Rating') {
        sortMode = 0;
    }

    // Reviews
    const [reviewsByLikes, setReviewsByLikes] = React.useState([]);
    const [reviewsByRating, setReviewsByRating] = React.useState([]);
    const [reviewsByDate, setReviewsByDate] = React.useState([]);

    let reviewURL = baseURL + "/review";
    React.useEffect(() => {
        axios.get(reviewURL + "/by_property_sort_likes/" + props.property_id).then((response) => {
            setReviewsByLikes(response.data);
        }).catch(error => {
            // Handle error
            console.error(error);
            // Display an error message or fallback UI
        });
    }, []);

    React.useEffect(() => {
        axios.get(reviewURL + "/by_property_sort_rating/" + props.property_id).then((response) => {
            setReviewsByRating(response.data);
        }).catch(error => {
            // Handle error
            console.error(error);
            // Display an error message or fallback UI
        });
    }, []);

    React.useEffect(() => {
        axios.get(reviewURL + "/by_property_sort_date/" + props.property_id).then((response) => {
            setReviewsByDate(response.data);
        }).catch(error => {
            // Handle error
            console.error(error);
            // Display an error message or fallback UI
        });
    }, []);

    const [appUsers, setAppUsers] = React.useState([]);
    let appUserURL = baseURL + "/appuser";
    React.useEffect(() => {
        axios.get(appUserURL).then((response) => {
            setAppUsers(response.data);
        }).catch(error => {
            // Handle error
            console.error(error);
            // Display an error message or fallback UI
        });
    }, []);


    const [reviews, setReviews] = React.useState([]);
    React.useEffect(() => {
        let sortedReviews = [];
        if (sortMode === 1) {
            sortedReviews = reviewsByLikes;
        } else if (sortMode === 2) {
            sortedReviews = reviewsByDate;
        } else {
            sortedReviews = reviewsByRating;
        }
        setReviews(sortedReviews);
    }, [sortMode, reviewsByLikes, reviewsByDate, reviewsByRating]);



    return(
        <div className={"review-list"}>
            <div className={"review-header"}>
                <h2 className={"review-list-title"}>Reviews ({reviews.length})</h2>
                <p>sort by</p>
                <DropDown selectedOption={selectedOption} handleSelect={handleSelect} />
            </div>
            <div className={"review-scrollable"}>
                <List>
                    {reviews && reviews.length > 0 ? (
                            reviews.map((review) => (
                                <div key={review.review_id}>
                                    <Review
                                        review_date={review.review_date}
                                        review_id={review.review_id}
                                        likes={review.likes}
                                        value={review.rating}
                                        title={review.review_title}
                                        description={review.review_body}
                                        reviewer={getAppUser(appUsers, review.reviewer_id).name + " " + getAppUser(appUsers, review.reviewer_id).surname}
                                        reviewer_id={review.reviewer_id}
                                        session_user_id={props.session_user_id}
                                    />
                                    <Divider variant="inset" component="li" />
                                </div>
                        ))
                        ) : (
                        <p>No reviews for this property</p>
                        )}
                </List>
            </div>
        </div>
    );
}

export default ReviewList;
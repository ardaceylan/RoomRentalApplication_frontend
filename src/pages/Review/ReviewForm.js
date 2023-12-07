import React, {useEffect, useState} from "react";

import './style.css'

import ReviewStars from "./components/ReviewStars";
import Button from "./components/Button";
import CommentBox from "./components/CommentBox";
import TitleBox from "./components/TitleBox";
import axios from "axios";

/*
 *  props:
 * isEdit : bool
 * reviewId : int // only needed when isEdit = true
 * reviewerId : int // only needed when isEdit = false (default value)
 * bookingId : int // only needed when isEdit = false (default value)
 */
const ReviewForm = (props) => {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const fetchReviewData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/gobooking/review/${props.reviewId}`
                );
                setRating(response.data.rating);
                setTitle(response.data.review_title);
                setDescription(response.data.review_body);
            } catch (error) {
                console.error(error);
            }
        };

        if (props.isEdit) {
            fetchReviewData();
        } else {
            resetForm();
        }
    }, [props.isEdit, props.reviewId]);

    const handleSubmit = async () => {
        try {
            const reviewData = {
                rating: rating,
                review_title: title,
                review_body: description,
                reviewer_id: props.reviewerId,
                booking_id: props.bookingId,
            };

            const reviewDataPut = {
                rating: rating,
                review_title: title,
                review_body: description,
            };

            if (props.isEdit) {
                let putRequest = `http://localhost:8080/gobooking/review/${props.reviewId}?rating=${reviewDataPut.rating}&review_title=${reviewDataPut.review_title}&review_body=${reviewDataPut.review_body}`;

                await axios.put(
                    putRequest,
                    reviewDataPut
                );
                console.log("Review updated successfully");
            } else {
                await axios.post(
                    "http://localhost:8080/gobooking/review",
                    reviewData
                );
                console.log("Review submitted successfully");
            }

            resetForm();
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const resetForm = () => {
        setRating(0);
        setTitle("");
        setDescription("");
    };

    return (
        <div className="review_form">
            <ReviewStars onChange={setRating} value={rating} />
            <TitleBox onChange={setTitle} value={title} />
            <CommentBox onChange={setDescription} value={description} />
            <Button classname="button--submit" text="Submit" onClick={handleSubmit} />
        </div>
    );
};

export default ReviewForm;
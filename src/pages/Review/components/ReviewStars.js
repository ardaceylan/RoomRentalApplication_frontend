import ReactStars from "react-rating-stars-component/dist/react-stars";
import React from 'react';

function ReviewStars(props){
    const ratingChanged = (newRating) => {
        props.onChange(newRating); // Pass the new rating value to the parent component
    };

    return (
        <div>
            <ReactStars
                value={props.value}
                count={5}
                onChange={ratingChanged}
                size={24}
                edit={true}
                activeColor="#ffd700"
            />
        </div>
    );
}

export default ReviewStars;
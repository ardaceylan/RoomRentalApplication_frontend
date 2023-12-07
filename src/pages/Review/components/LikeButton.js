import React, {useEffect, useState} from "react";
import "../../AdminDashboard/style.css";
import axios from "axios";


const LikeButton = (props) => {
    const updateLikes = (reviewId) => {
        axios.put(`http://localhost:8080/gobooking/review/update_likes/${reviewId}/${props.session_user_id}`)
            .then(response => {
                // Handle the response if necessary
            })
            .catch(error => {
                // Handle any errors that occurred during the request
            });
    };

    const decrementLikes = (reviewId) => {
        axios.put(`http://localhost:8080/gobooking/review/decrement_likes/${reviewId}/${props.session_user_id}`)
            .then(response => {
                // Handle the response if necessary
            })
            .catch(error => {
                // Handle any errors that occurred during the request
            });
    };


    const [like, setLike] = useState(props.likes),
        [isLike, setIsLike] = useState(props.isLiked);

        useEffect(() => {
            setIsLike(props.isLiked);
        }, [props.isLiked]);

        const onLikeButtonClick = () => {
            setLike(like + (isLike?-1:1));
            setIsLike(!isLike);
            if (!isLike){
                updateLikes(props.review_id);
            } else {
                decrementLikes(props.review_id);
            }
        };

    return (
        <>
            <button
                className={"like-button " + (isLike ? "liked" : "")}
                onClick={onLikeButtonClick}
            >
                {"Like"} | {like}
            </button>
            <style>{`
        .like-button {
            font-size: 1rem;
            padding: 5px 10px;
            color:  #585858;
            border-radius : 10px;
        }
        .liked {
            font-weight: bold;
            color: #1565c0;
          }
      `}</style>
        </>
    );
};

export default LikeButton;
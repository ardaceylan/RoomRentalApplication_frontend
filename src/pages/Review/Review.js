import React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import StaticReviewStars from "../../CommonComponents/StaticReviewStars";
import ListItem from "@mui/material/ListItem";
import LikeButton from "./components/LikeButton";
import Divider from "@mui/material/Divider";
import axios from "axios";
import ReviewForm from "./ReviewForm";

function Review(props) {
    const [isLiked, setIsLiked] = React.useState(false);
    const [isEditFormVisible, setIsEditFormVisible] = React.useState(false);

    let reviewURL = "http://localhost:8080/gobooking/review/isLiked";
    React.useEffect(() => {
        axios
            .get(reviewURL + "/" + props.review_id + "/" + props.session_user_id)
            .then((response) => {
                setIsLiked(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleEditReview = () => {
        setIsEditFormVisible(true);
    };

    return (
        <div className={"review"}>
            <ListItem alignItems="flex-start" disablePadding={true}>
                <ListItemAvatar>
                    <Avatar alt={props.alt} src={props.src} />
                </ListItemAvatar>
                <ListItemText
                    primary={props.primary}
                    secondary={
                        <React.Fragment>
                            <div>
                                {props.session_user_id !== props.reviewer_id && (
                                    <b className={"reviewer-name"}>{props.reviewer}</b>
                                )}
                                {props.session_user_id === props.reviewer_id && (
                                    <div className={"review-title-edit"}>
                                        <b className={"reviewer-name"}>You ({props.reviewer})</b>
                                        <button
                                            className={"button-edit"}
                                            onClick={handleEditReview}
                                        >
                                            edit
                                        </button>
                                    </div>
                                )}
                            </div>
                            <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                <StaticReviewStars className={"stars"} value={props.value} />
                            </Typography>
                            <div>
                                <h5 className={"review-title"}>{props.title}</h5>
                                <p>{props.description}</p>
                                <i>
                                    {props.review_date.substring(0, 10)} at{" "}
                                    {props.review_date.substring(11, 19)}
                                </i>
                            </div>
                            <LikeButton
                                likes={props.likes}
                                review_id={props.review_id}
                                isLiked={isLiked}
                                session_user_id={props.session_user_id}
                            />
                            {isEditFormVisible && (
                                <ReviewForm
                                    reviewId={props.review_id}
                                    reviewerId={props.reviewer_id}
                                    bookingId={props.booking_id}
                                    isEdit={true}
                                />
                            )}
                        </React.Fragment>
                    }
                />
            </ListItem>
        </div>
    );
}

export default Review;

import React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import StaticReviewStars from "../../../CommonComponents/StaticReviewStars";

function ScrollListElement(props){
    return (
        <div className={"top-list-element"}>
            <ListItem alignItems="flex-start" disablePadding={true}>
                <ListItemAvatar>
                    <Avatar alt={props.alt} src={props.src} />
                </ListItemAvatar>
                <ListItemText
                    primary={props.primary}
                    secondary={
                        <React.Fragment>
                            {props.type === 1 && (
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    <div className={"review-stars-value"}>
                                        <StaticReviewStars value={props.value} />
                                        <b>({props.value})</b>
                                    </div>
                                </Typography>
                            )}
                            {props.type === 2 && (
                                <div>
                                    <>added {props.date.substring(0, 10)} at </>
                                    <p>{props.date.substring(11, 19)}</p>
                                </div>
                            )}
                            {props.type === 3 && (
                                <p>Booked {props.timesBooked} time(s)</p>
                            )}
                            {"\nOwned by"}
                            <br/>
                            <b>{props.owner_name}</b>
                        </React.Fragment>
                    }
                />
            </ListItem>
        </div>
    );
}

export default ScrollListElement;
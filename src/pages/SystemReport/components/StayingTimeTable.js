import React from "react";
import Review from "../../Review/Review";
import Divider from "@mui/material/Divider";

const StayingTimeTable = (props) => {
    return (
        <table>
            <thead>
            <tr>
                <th>City</th>
                <th>Avg staying time per booking</th>
            </tr>
            </thead>
            <tbody>
            {props.data && props.data.length > 0 ? (
                props.data.map((entry) => (
                    <tr>
                        <td>{entry.city}</td>
                        <td>{entry.days} days</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td>no data</td>
                    <td>no data</td>
                </tr>
            )}
            </tbody>
        </table>
    );
};

export default StayingTimeTable;

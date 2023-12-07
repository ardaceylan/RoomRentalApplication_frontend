import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';


import house1 from "./images/house1.jpg";
import house2 from "./images/house2.jpg";
import house3 from "./images/house3.jpg";
import house4 from "./images/house4.jpg";
import house5 from "./images/house5.jpg";
import ScrollListElement from "./ScrollListElement";

function TopList(props) {
    return (
        <div className={"toplist-wrap"}>
            <h4>{props.title}</h4>
            <div className={"toplist--ext"}>
                <div className={"toplist"}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {props.data && props.data.length > 0 ? (
                            props.data.map((property) => (
                                <div key={property.id}>
                                    <ScrollListElement
                                        alt={"house1"}
                                        src={house1}
                                        primary={property.title}
                                        value={property.avg_rating}
                                        owner_name={property.owner_name + " " + property.owner_surname}
                                        type ={props.type}
                                        date ={property.added_date}
                                        timesBooked ={property.times_booked}
                                    />
                                    <Divider variant="inset" component="li" />
                                </div>
                            ))
                        ) : (
                            <p>No data found</p>
                        )}
                    </List>
                </div>
            </div>
        </div>
    );
}

export default TopList;
import React, { useState } from "react";

import './style.css'
import ProfileCard from "./components/ProfileCard";
import {devtool} from "react-rating-stars-component/webpack.config";
import TopList from "./components/TopList";
import SystemReportSection from "./components/SystemReportSection";
import Info from "./components/Info";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Navbar from "../../common_components/NavbarAdmin";

const baseURL = "http://localhost:8080/gobooking";

function AdminDashboard() {
    const { id } = useParams();
    let propertyURL = baseURL + "/property";

    React.useEffect( () => {
        axios.get(`http://localhost:8080/gobooking/user/id/${id}`).then((response) => {
            setName(response.data.name);
            setSurname(response.data.surname);
        }).catch(error => {
            // Handle error
            console.error(error);
            // Display an error message or fallback UI
        });  
    })

    const [propertiesByRating, setPropertiesByRating] = React.useState([]);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    React.useEffect(() => {
        axios.get(propertyURL + "/sort_by_rating").then((response) => {
            setPropertiesByRating(response.data);
        }).catch(error => {
            // Handle error
            console.error(error);
            // Display an error message or fallback UI
        });
    }, []);

    const [propertiesByDate, setPropertiesByDate] = React.useState([]);

    React.useEffect(() => {
        axios.get(propertyURL + "/sort_by_date").then((response) => {
            setPropertiesByDate(response.data);
        }).catch(error => {
            // Handle error
            console.error(error);
            // Display an error message or fallback UI
        });
    }, []);

    const [propertiesByBooked, setPropertiesByBooked] = React.useState([]);

    
    React.useEffect(() => {
        axios.get(propertyURL + "/sort_by_booked").then((response) => {
            setPropertiesByBooked(response.data);
        }).catch(error => {
            // Handle error
            console.error(error);
            // Display an error message or fallback UI
        });
    }, []);

    // AppUsers
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

    // Reviews
    const [reviews, setReviews] = React.useState([]);

    let reviewURL = baseURL + "/review";
    React.useEffect(() => {
        axios.get(reviewURL).then((response) => {
            setReviews(response.data);
        }).catch(error => {
            // Handle error
            console.error(error);
            // Display an error message or fallback UI
        });
    }, []);

    return (
        <div className={"admin-page"}>
            <Navbar />
            <h1>Admin Dashboard</h1>
            <ProfileCard name={name} surname = {surname}/>
            <div className={"info-section"}>
                <div className={"toplist-border"}>
                    <h2>Some Property Related Data</h2>
                    <div className={"toplist-section"}>
                        <TopList
                             title={"Top Rated"}
                             data={propertiesByRating}
                             type = {1}
                        />

                        <TopList
                            title={"Newly Posted"}
                            data={propertiesByDate}
                            type={2}
                        />

                        <TopList
                            title={"Most Booked"}
                            data={propertiesByBooked}
                            type={3}
                        />
                    </div>
                </div>
                <div className={"generate-section"}>
                    <div className={"right-side"}>
                        <SystemReportSection />
                    </div>
                </div>
            </div>
        </div>
    );
}

// <Info adsToday={10} adsMonth={47} bookingsToday={12} bookingsMonth={63}/>

export default AdminDashboard;
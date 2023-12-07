import React, { useState, useEffect } from "react";
import './style.css';
import LChart from "./components/LChart";
import PChart from "./components/PChart";
import axios from "axios";
import DropDown from "./components/DropDown";
import StayingTimeTable from "./components/StayingTimeTable";

const baseURL = "http://localhost:8080/gobooking";

function SystemReport() {
    const [selectedOption1, setSelectedOption1] = useState("Last Week");

    const handleSelect1 = (eventKey) => {
        setSelectedOption1(eventKey);
    };

    const [selectedOption2, setSelectedOption2] = useState("Last Week");

    const handleSelect2 = (eventKey) => {
        setSelectedOption2(eventKey);
    };

    const [selectedOption3, setSelectedOption3] = useState("Last Week");

    const handleSelect3 = (eventKey) => {
        setSelectedOption3(eventKey);
    };

    const [selectedOption4, setSelectedOption4] = useState("Last Week");

    const handleSelect4 = (eventKey) => {
        setSelectedOption4(eventKey);
    };



    const getChartData = (url) => {
        axios
            .get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getMostBookedCities = () => {
        const bookingURL = baseURL + "/bookings/most_booked_cities";
        axios
            .get(bookingURL)
            .then((response) => {
                setMostBookedCities(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getTopUserLocations = () => {
        const appUserURL = baseURL + "/appuser/top_user_location";
        axios
            .get(appUserURL)
            .then((response) => {
                setTopUserLocations(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getUserData = () => {
        const appUserURL = baseURL + "/appuser/count_users";

        let url = appUserURL;

        if (selectedOption2 === "Last Week") {
            url += "=1";
        } else if (selectedOption2 === "Last Month") {
            url += "=2";
        } else if (selectedOption2 === "Last Year") {
            url += "=3";
        } else if (selectedOption2 === "Last 5 Years") {
            url += "=4";
        }

        axios
            .get(url)
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getReviewData = () => {
        const reviewURL = baseURL + "/review/review_average";

        let url = reviewURL;

        if (selectedOption3 === "Last Week") {
            url += "=1";
        } else if (selectedOption3 === "Last Month") {
            url += "=2";
        } else if (selectedOption3 === "Last Year") {
            url += "=3";
        } else if (selectedOption3 === "Last 5 Years") {
            url += "=4";
        }

        axios
            .get(url)
            .then((response) => {
                setReviewData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getPropertyData = () => {
        const propertyURL = baseURL + "/property";
        let url = propertyURL;

        if (selectedOption1 === "Last Week") {
            url += "/count_property=1";
        } else if (selectedOption1 === "Last Month") {
            url += "/count_property=2";
        } else if (selectedOption1 === "Last Year") {
            url += "/count_property=3";
        } else if (selectedOption1 === "Last 5 Years") {
            url += "/count_property=4";
        }

        axios
            .get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getStayingData = () => {
        const bookingUrl = baseURL + "/bookings";
        let url = bookingUrl + "/staying_data";

        axios
            .get(url)
            .then((response) => {
            setStayingData(response.data);
        })
            .catch((error) => {
                console.error(error);
            });
    };

    const getTransactionsData = () => {
        const bookingURL = baseURL + "/bookings/transactions";

        let url = bookingURL;

        if (selectedOption4 === "Last Week") {
            url += "=1";
        } else if (selectedOption4 === "Last Month") {
            url += "=2";
        } else if (selectedOption4 === "Last Year") {
            url += "=3";
        } else if (selectedOption4 === "Last 5 Years") {
            url += "=4";
        }

        axios
            .get(url)
            .then((response) => {
                setTransactionsData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const [label1, setLabel1] = useState("");
    const [label2, setLabel2] = useState("");
    const [label3, setLabel3] = useState("");
    const [label4, setLabel4] = useState("");

    useEffect(() => {
        getMostBookedCities();
        getTopUserLocations();
        getUserData();
        getReviewData();
        getPropertyData();
        getStayingData();
        getTransactionsData();

        if (selectedOption1 === "Last Week") {
            setLabel1("Days");
        } else if (selectedOption1 === "Last Month") {
            setLabel1("Days");
        } else if (selectedOption1 === "Last Year") {
            setLabel1("Months");
        } else if (selectedOption1 === "Last 5 Years") {
            setLabel1("Years");
        }

        if (selectedOption2 === "Last Week") {
            setLabel2("Days");
        } else if (selectedOption2 === "Last Month") {
            setLabel2("Days");
        } else if (selectedOption2 === "Last Year") {
            setLabel2("Months");
        } else if (selectedOption2 === "Last 5 Years") {
            setLabel2("Years");
        }

        if (selectedOption3 === "Last Week") {
            setLabel3("Days");
        } else if (selectedOption3 === "Last Month") {
            setLabel3("Days");
        } else if (selectedOption3 === "Last Year") {
            setLabel3("Months");
        } else if (selectedOption3 === "Last 5 Years") {
            setLabel3("Years");
        }

        if (selectedOption4 === "Last Week") {
            setLabel4("Days");
        } else if (selectedOption4 === "Last Month") {
            setLabel4("Days");
        } else if (selectedOption4 === "Last Year") {
            setLabel4("Months");
        } else if (selectedOption4 === "Last 5 Years") {
            setLabel4("Years");
        }
    }, [selectedOption1, selectedOption2, selectedOption3, selectedOption4]);

    const [mostBookedCities, setMostBookedCities] = useState([]);
    const [topUserLocations, setTopUserLocations] = useState([]);
    const [userData, setUserData] = useState([]);
    const [reviewData, setReviewData] = useState([]);
    const [data, setData] = useState([]);
    const [stayingData, setStayingData] = useState([]);
    const [transactionsData, setTransactionsData] = useState([]);

    return (
        <div className="report-page">
            <h1>System Report</h1>
            <div className="report-content">
                <div className={"chart-flex"}>
                    <div className="chart">
                        <div className="chart-title">
                            <h4 className="chart-title-text">Number of ads and bookings</h4>
                            <DropDown selectedOption={selectedOption1} handleSelect={handleSelect1} />
                        </div>
                        {label1 && (
                            <LChart
                                data={data}
                                line1="ads"
                                line2="bookings"
                                width={1000}
                                length={400}
                                label={label1}
                            />
                        )}
                    </div>
                </div>

                <div className={"chart-flex"}>
                    <div className="chart">
                        <div className="chart-title">
                            <h4 className="chart-title-text">Number of users</h4>
                            <DropDown selectedOption={selectedOption2} handleSelect={handleSelect2} />
                        </div>
                        {label1 && (
                            <LChart
                                data={userData}
                                line1="users"
                                oneline={true}
                                width={1000}
                                length={400}
                                label={label2}
                            />
                        )}
                    </div>
                </div>

                <PChart data={mostBookedCities} title="Most Booked Cities" />

                <div className={"chart-flex"}>
                    <div className="chart">
                        <div className="chart-title">
                            <h4 className="chart-title-text">Review average</h4>
                            <DropDown selectedOption={selectedOption3} handleSelect={handleSelect3} />
                        </div>
                        {label1 && (
                            <LChart
                                data={reviewData}
                                line1="rating"
                                oneline={true}
                                width={1000}
                                length={400}
                                max={5}
                                label={label3}
                            />
                        )}
                    </div>
                </div>

                <PChart data={topUserLocations} title="User Location" />


                <div className={"chart-flex"}>
                    <div className={"chart"}>
                        <div className={"chart-title"}>
                            <h4 className={"chart-title-text"}>Total TL transactions</h4>
                            <DropDown selectedOption={selectedOption4} handleSelect={handleSelect4} />
                        </div>
                        {label1 && (
                            <LChart
                                data={transactionsData}
                                line1={"amount"}
                                oneline={true}
                                width={1000}
                                length={400}
                                max={5}
                                label={label4}
                            />
                        )}
                    </div>
                </div>
                <StayingTimeTable data={stayingData}/>
            </div>
        </div>
    );
}

export default SystemReport;

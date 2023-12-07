import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";




function SystemReportSection() {
    const navigate = useNavigate();
    function handleNavigate() {
        navigate("/system_report");
    }

    return (
        <div>
            <h2>System Report</h2>
            <div className={"generate-report"}>
                <p>Click the button below to generate a system report containing the most important statistics on this platform.</p>
                <Button text={"Generate System Report"} classname={"button--generate"} onClick={() => { handleNavigate() }} />
            </div>
        </div>
    );
}

export default SystemReportSection;
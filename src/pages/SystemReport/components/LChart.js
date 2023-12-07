import React, {useState} from "react";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import DropDown from "./DropDown";

function LChart(props) {

    let secondLine = <Line type="monotone" dataKey={props.line2} stroke="#82ca9d"  />;
    if (props.oneline){
        secondLine = null;
    }

    let label = props.label + " before today";

    return (
        <div>
            <LineChart
                width={props.width}
                height={props.length}
                data={props.data}
                //margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
                <XAxis dataKey="time" label={{ value: label, position: 'insideBottom', offset: -2 }}/>
                <YAxis label={{ value: 'Value', angle: -90, position: 'insideLeft' }} max={props.max}/>
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey={props.line1} stroke="#8884d8"  />
                {secondLine}
            </LineChart>
        </div>
    );


    /*
    return (
        <div className={"chart"}>
            <div>
                <h3>{props.title}</h3>
                <DropDown />
            </div>
            <LineChart
                width={props.width}
                height={props.length}
                data={props.data}
                //margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
                <XAxis dataKey="name" />
                <YAxis max={props.max}/>
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey={props.line1} stroke="#8884d8"  />
                {secondLine}
            </LineChart>

        </div>
    );
    */
}

export default LChart;
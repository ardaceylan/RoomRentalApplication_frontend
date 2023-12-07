import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function DropDown(props) {
    return (
        <DropdownButton
            title={props.selectedOption}
            onSelect={props.handleSelect}
        >
            <Dropdown.Item eventKey="Last Week">Last Week</Dropdown.Item>
            <Dropdown.Item eventKey="Last Month">Last Month</Dropdown.Item>
            <Dropdown.Item eventKey="Last Year">Last Year</Dropdown.Item>
            <Dropdown.Item eventKey="Last 5 Years">Last 5 Years</Dropdown.Item>
        </DropdownButton>
    );


    /*
    const [selectedOption, setSelectedOption] = useState('Last Week');

    const handleSelect = (eventKey) => {
        setSelectedOption(eventKey);
    };

    return (
        <DropdownButton
            title={selectedOption}
            onSelect={handleSelect}
        >
            <Dropdown.Item eventKey="Last Week">Last Week</Dropdown.Item>
            <Dropdown.Item eventKey="Last Month">Last Month</Dropdown.Item>
            <Dropdown.Item eventKey="Last Year">Last Year</Dropdown.Item>
            <Dropdown.Item eventKey="Last 5 Years">Last 5 Years</Dropdown.Item>
        </DropdownButton>
    );
    */
}

export default DropDown;
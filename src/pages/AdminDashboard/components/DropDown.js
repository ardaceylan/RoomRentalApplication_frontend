import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function DropDown(props) {
    return (
        <DropdownButton
            title={props.selectedOption}
            onSelect={props.handleSelect}
        >
            <Dropdown.Item eventKey="Rating">Rating</Dropdown.Item>
            <Dropdown.Item eventKey="Likes">Likes</Dropdown.Item>
            <Dropdown.Item eventKey="Date">Date</Dropdown.Item>
        </DropdownButton>
    );
}

export default DropDown;
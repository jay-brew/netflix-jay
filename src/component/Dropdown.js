import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function BasicButtonExample() {

  const [title, setTitle] = useState("Sort");

  const setSortValue = (changeValue) => {
    setTitle(changeValue)
  }

    return (
      <DropdownButton id="dropdown-basic-button" title={title}>
        <Dropdown.Item onClick={(e) => setSortValue(e.target.text)}>Sort</Dropdown.Item>
        <Dropdown.Item onClick={(e) => setSortValue(e.target.text)}>asc</Dropdown.Item>
        <Dropdown.Item onClick={(e) => setSortValue(e.target.text)}>desc</Dropdown.Item>
      </DropdownButton>
    );
  }
  
  export default BasicButtonExample;
import React from 'react';
import Nav from "react-bootstrap/Nav";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Form, InputGroup } from "react-bootstrap";
import Geosuggest from "react-geosuggest";
import "./navbar.css";

function SearchBar() {
    return (
        <div>
            <Nav className="mr-auto justify-content-center">
					<Form inline className="nav-search-bar search-group">
						<InputGroup className="mb-2 mr-sm-2" hasValidation>
							<InputGroup.Prepend>
								<DropdownButton
									menuAlign="right"
									title="Category"
									id="dropdown-menu-align-right"
									variant="light"
								>
									<Dropdown.Item eventKey="1" href="#1">
										Clothing
									</Dropdown.Item>
									<Dropdown.Item eventKey="2" href="#2">
										Electronics
									</Dropdown.Item>
									<Dropdown.Item eventKey="3" href="#3">
										Food
									</Dropdown.Item>
									<Dropdown.Item eventKey="4" href="#4">
										Hobbies
									</Dropdown.Item>
									<Dropdown.Item eventKey="4" href="#4">
										Home & Living
									</Dropdown.Item>
								</DropdownButton>
							</InputGroup.Prepend>

							<Form.Control
								type="text"
								placeholder="Enter keywords.."
								required
							/>

							<Geosuggest className="navbar-location" />
						</InputGroup>
					</Form>
					</Nav>
        </div>
    )
}

export default SearchBar

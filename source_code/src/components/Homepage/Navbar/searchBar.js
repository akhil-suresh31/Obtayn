import React from "react";
import Nav from "react-bootstrap/Nav";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Form, InputGroup } from "react-bootstrap";
import Geosuggest from "react-geosuggest";
import "./navbar.css";
import { Search } from "react-bootstrap-icons";

const onFocus = () => console.log("onFocus");

/**
 * When the input loses focus
 */
const onBlur = (value) => console.log("onBlur", value);

/**
 * When the input got changed
 */
const onChange = (value) => console.log(`input changes to : ${value}`);

/**
 * When a suggest got selected
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onSuggestSelect = (suggest) => console.log(suggest);

/**
 * When there are no suggest results
 */
const onSuggestNoResults = (userInput) =>
	console.log(`onSuggestNoResults for : ${userInput}`);

const fixtures = [
	{ label: "New York", location: { lat: 40.7033127, lng: -73.979681 } },
	{ label: "Rio", location: { lat: -22.066452, lng: -42.9232368 } },
	{ label: "Tokyo", location: { lat: 35.673343, lng: 139.710388 } },
];

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
						<Geosuggest
							onFocus={onFocus}
							onBlur={onBlur}
							onChange={onChange}
							onSuggestSelect={onSuggestSelect}
							onSuggestNoResults={onSuggestNoResults}
							radius="20"
						/>
						<InputGroup.Text className="search-button">
							<Search />
						</InputGroup.Text>
					</InputGroup>
				</Form>
			</Nav>
		</div>
	);
}

export default SearchBar;

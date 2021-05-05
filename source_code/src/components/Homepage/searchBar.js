import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import LocationAutoComplete from "./LocationAutoComplete";
import "./homepage";

function SearchBar({ setData, setSearchButton }) {
	const [location, setLocation] = useState(null);
	const searchFeed = (e) => {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		const formDataObj = Object.fromEntries(formData.entries());
		console.log(location); // lcoation text
		console.log(formDataObj);
		if (
			!formDataObj["searchCategory"] &&
			!formDataObj["searchKeywords"] &&
			!location
		) {
			alert("EMPTY FORM!");
			setSearchButton(false);
		} else {
			if (
				!formDataObj["searchCategory"] ||
				formDataObj["searchCategory"] == "None" ||
				formDataObj["searchCategory"] == "Category"
			)
				formDataObj["searchCategory"] = "";

			setData({
				category: formDataObj["searchCategory"],
				keyword: formDataObj["searchKeywords"],
				location: !location ? "" : location.value.formatted,
			});
			setSearchButton(true);
			console.log("Submitting!");
		}
	};

	const handleReset = () => {
		if (document.getElementsByName("searchForm")[0])
			document.getElementsByName("searchForm")[0].reset();
		setLocation(null);
		setSearchButton(false);
	};

	return (
		<div className="d-flex justify-content-center">
			<Form
				inline
				className="nav-search-bar search-group"
				onSubmit={searchFeed}
				name="searchForm"
			>
				<InputGroup className="mb-2 mr-sm-2" hasValidation>
					<InputGroup.Prepend>
						<Form.Control
							as="select"
							name="searchCategory"
							defaultValue=""
						>
							<option disabled value="">
								Category
							</option>
							<option>Clothing</option>
							<option>Electronics</option>
							<option>Food</option>
							<option>Hobbies</option>
							<option>Home & Living</option>
							<option>Other</option>
							<option>None</option>
						</Form.Control>
					</InputGroup.Prepend>

					<Form.Control
						style={{
							minWidth: "150px",
							maxWidth: "200px",
							borderRadius: "2px",
						}}
						type="text"
						placeholder="Enter keywords.."
						name="searchKeywords"
					/>
					<Form.Group className="location-search">
						<LocationAutoComplete
							setLocation={setLocation}
							location={location}
						/>
					</Form.Group>
					<Button type="submit" className="submit-btn">
						Search
					</Button>
					<Button
						type="reset"
						className="reset-btn"
						onClick={handleReset}
					>
						Clear
					</Button>
				</InputGroup>
			</Form>
		</div>
	);
}

export default SearchBar;

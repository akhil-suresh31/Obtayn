import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Form, InputGroup, Button } from "react-bootstrap";
import "./navbar.css";

function SearchBar({ setData, setSearchButton }) {
	const searchFeed = (e) => {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		const formDataObj = Object.fromEntries(formData.entries());
		console.log(formDataObj);
		if (
			!formDataObj["searchCategory"] &&
			!formDataObj["searchKeywords"] &&
			!formDataObj["searchLocation"]
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
				location: formDataObj["searchLocation"],
			});
			setSearchButton(true);
			console.log("Submitting!");
		}
	};

	const handleReset = () => {
		if (document.getElementsByName("searchForm")[0])
			document.getElementsByName("searchForm")[0].reset();
		setSearchButton(false);
	};

	return (
		<div>
			<Nav className="mr-auto justify-content-center">
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
								// defaultValue="Category"
							>
								<option
									disabled={true}
									selected="selected"
									value=""
								>
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
							type="text"
							placeholder="Enter keywords.."
							name="searchKeywords"
						/>
						<Form.Control
							type="text"
							placeholder="Enter Location.."
							name="searchLocation"
						/>
						<Button
							variant="secondary"
							type="submit"
							className="submit-btn"
						>
							Search
						</Button>
						<Button
							variant="secondary"
							type="reset"
							className="reset-btn"
							onClick={handleReset}
						>
							Clear
						</Button>
					</InputGroup>
				</Form>
			</Nav>
		</div>
	);
}

export default SearchBar;

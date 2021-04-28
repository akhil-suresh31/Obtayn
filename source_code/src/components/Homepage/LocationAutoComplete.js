import React, { useState, useEffect, useRef } from "react";
import { GeoCode } from "geo-coder";
import { Form } from "react-bootstrap";
import "./LocationAutoComplete.css";

function LocationAutoComplete({ getLocation }) {
	const [selectedSuggestion, setSelectedSuggestion] = useState(0);
	const [userInput, setUserInput] = useState();
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestion, setShowSuggestion] = useState(false);
	const [selected, setSelected] = useState();

	const ref = useRef(null);

	const onClick = (e, loc) => {
		setUserInput(e.target.innerText);
		setSelected(loc);
		setSelectedSuggestion(0);
		setShowSuggestion(false);
		setSuggestions([]);
	};

	useEffect(() => {
		var getSuggest = async () => {
			const geoCode = new GeoCode();
			var result = await geoCode.geolookup(userInput);
			result = result.filter((item) => item.raw.importance > 0.3);
			if (selected) {
				setSuggestions([]);
				setShowSuggestion(false);
			} else {
				setSuggestions(result);
				setShowSuggestion(true);
			}
			//			console.log(result);
			setSelectedSuggestion(0);
			if (selected && userInput !== selected.formatted) {
				setSelected(null);
			}
		};
		getSuggest();
	}, [userInput]);

	useEffect(() => {
		if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
	}, [selectedSuggestion]);

	useEffect(() => {
		getLocation(selected);
	}, [selected]);

	const onKeyDown = (e) => {
		if (e.keyCode === 13 && userInput) {
			setShowSuggestion(false);
			setUserInput(suggestions[selectedSuggestion].formatted);
			setSelected(suggestions[selectedSuggestion]);
			setSelectedSuggestion(0);
		} else if (e.keyCode === 38) {
			if (selectedSuggestion === 0) return;
			setSelectedSuggestion(selectedSuggestion - 1);
		} else if (e.keyCode === 40) {
			if (selectedSuggestion === suggestions.length - 1) return;
			setSelectedSuggestion(selectedSuggestion + 1);
		}
	};
	let suggestionList;

	if (showSuggestion && userInput) {
		if (suggestions.length) {
			suggestionList = (
				<ul className="suggestions">
					{suggestions.map((loc, index) => {
						let className;
						if (index == selectedSuggestion)
							className = "selected-suggestion";
						return (
							<li
								ref={index == selectedSuggestion ? ref : null}
								className={className}
								key={index}
								onClick={(e) => onClick(e, loc)}
							>
								{loc.formatted}
							</li>
						);
					})}
				</ul>
			);
		} else {
			suggestionList = (
				<div className="no-suggestion">
					No suggestion available,best of luck!
				</div>
			);
		}
	}

	return (
		<>
			<input
				type="text"
				className="form-control"
				// className="userInput"
				onKeyDown={onKeyDown}
				value={userInput}
				onChange={(e) => {
					setUserInput(e.target.value);
				}}
				placeholder="Enter Location.."
			/>

			{suggestionList}
		</>
	);
}

export default LocationAutoComplete;

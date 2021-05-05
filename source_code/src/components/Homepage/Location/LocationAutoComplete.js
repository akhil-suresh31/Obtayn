import React, { useRef, useState } from "react";
import { GeoCode } from "geo-coder";
import Async from "react-select/async";

const LocationAutoComplete = ({ setLocation, isrequest, location }) => {
	const selectLocationRef = useRef();

	const loadOptions = async (inputText, callback) => {
		const geoCode = new GeoCode();
		var results = await await geoCode.geolookup(inputText);
		results = results.filter((item) => item.raw.importance > 0.3);
		console.log(inputText);
		callback(results.map((loc) => ({ label: loc.formatted, value: loc })));
	};

	const customStyles = {
		menu: (provided, state) => ({
			...provided,
			marginTop: "4px",
		}),
		menuList: (provided, state) => ({
			...provided,
			maxHeight: isrequest ? "30vh" : "11vh",
		}),
	};

	return (
		<div style={{ width: "100%" }}>
			<Async
				ref={selectLocationRef}
				noOptionsMessage={() => "No such location"}
				onChange={setLocation}
				value={location}
				placeholder={"Enter Location.."}
				loadOptions={loadOptions}
				menuShouldScrollIntoView
				styles={customStyles}
				backspaceRemovesValue={true}
			/>
		</div>
	);
};

export default LocationAutoComplete;

import React, { useState } from "react";
import { GeoCode } from "geo-coder";
import Async from "react-select/async";
import { Provider } from "react-redux";

const LocationAutoComplete = ({ setLocation, isrequest }) => {
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
				noOptionsMessage={() => "No such location"}
				onChange={setLocation}
				placeholder={"Enter Location.."}
				loadOptions={loadOptions}
				menuShouldScrollIntoView
				styles={customStyles}
			/>
		</div>
	);
};

export default LocationAutoComplete;

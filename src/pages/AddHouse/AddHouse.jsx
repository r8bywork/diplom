import axios from "axios";
import React, { useState } from "react";

const AddHouse = () => {
	const [name, setName] = useState("");
	const [cowsCount, setCowsCount] = useState(0);

	const handleSave = async () => {
		try {
			const requestBody = {
				houses: [
					{
						name: name,
						cowsCount: cowsCount,
					},
				],
			};

			const response = await axios.post(
				"http://localhost:3001/houses/add",
				requestBody
			);
			console.log(response.data); // Handle the response as needed

			// Reset the form fields
			setName("");
			setCowsCount(0);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h2>Add House</h2>
			<label>
				Name:
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</label>
			<br />
			<label>
				Cows Count:
				<input
					type="number"
					value={cowsCount}
					onChange={(e) => setCowsCount(e.target.value)}
				/>
			</label>
			<br />
			<button onClick={handleSave}>Save</button>
		</div>
	);
};

export default AddHouse;

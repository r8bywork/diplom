import { Button, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";

const AddFeedPage = () => {
	const [name, setFeedType] = useState("");
	const [balance, setRemainingAmount] = useState("");
	const [daily_requirement, setDailyRequirement] = useState("");

	const handleFeedTypeChange = (event) => {
		setFeedType(event.target.value);
	};

	const handleRemainingAmountChange = (event) => {
		setRemainingAmount(event.target.value);
	};

	const handleDailyRequirementChange = (event) => {
		setDailyRequirement(event.target.value);
	};

	const handleAddFeed = async () => {
		const feedAndAddivitives = {
			name,
			balance,
			daily_requirement,
		};
		// console.log("Feed added:", { name, balance, daily_requirement });
		try {
			const response = await axios.post(
				"http://localhost:3001/feedAndAddivitives/update",
				feedAndAddivitives
			);
			return response.data;
		} catch (error) {
			throw new Error(error.response.data);
		}
	};

	return (
		<form
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				maxWidth: "100%",
				// maxWidth: "700px",
				margin: "auto",
			}}
			onSubmit={(e) => e.preventDefault()}
		>
			<h1>Добавление комбикорма и добавок</h1>
			<div style={{ marginBottom: "16px", width: "100%" }}>
				<label style={{ marginRight: "16px" }}>Наимнование:</label>
				<Input
					style={{ flex: "1" }}
					value={name}
					onChange={handleFeedTypeChange}
				/>
			</div>
			<div style={{ marginBottom: "16px", width: "100%" }}>
				<label style={{ marginRight: "16px" }}>Количество:</label>
				<Input
					style={{ flex: "1" }}
					value={balance}
					onChange={handleRemainingAmountChange}
				/>
			</div>
			<div style={{ marginBottom: "16px", width: "100%" }}>
				<label style={{ marginRight: "16px" }}>Дневная потребность:</label>
				<Input
					style={{ flex: "1" }}
					value={daily_requirement}
					onChange={handleDailyRequirementChange}
				/>
			</div>
			<Button type="primary" onClick={handleAddFeed}>
				Добавить комбикорм
			</Button>
		</form>
	);
};

export { AddFeedPage };

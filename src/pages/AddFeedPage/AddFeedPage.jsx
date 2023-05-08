import { Button, Input } from "antd";
import React, { useState } from "react";

const AddFeedPage = () => {
	const [feedType, setFeedType] = useState("");
	const [remainingAmount, setRemainingAmount] = useState("");
	const [dailyRequirement, setDailyRequirement] = useState("");

	const handleFeedTypeChange = (event) => {
		setFeedType(event.target.value);
	};

	const handleRemainingAmountChange = (event) => {
		setRemainingAmount(event.target.value);
	};

	const handleDailyRequirementChange = (event) => {
		setDailyRequirement(event.target.value);
	};

	const handleAddFeed = () => {
		// Add feed to database or perform other actions here
		console.log("Feed added:", { feedType, remainingAmount, dailyRequirement });

		// Clear input fields after adding feed
		setFeedType("");
		setRemainingAmount("");
		setDailyRequirement("");
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
					value={feedType}
					onChange={handleFeedTypeChange}
				/>
			</div>
			<div style={{ marginBottom: "16px", width: "100%" }}>
				<label style={{ marginRight: "16px" }}>Количество:</label>
				<Input
					style={{ flex: "1" }}
					value={remainingAmount}
					onChange={handleRemainingAmountChange}
				/>
			</div>
			<div style={{ marginBottom: "16px", width: "100%" }}>
				<label style={{ marginRight: "16px" }}>Дневная потребность:</label>
				<Input
					style={{ flex: "1" }}
					value={dailyRequirement}
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

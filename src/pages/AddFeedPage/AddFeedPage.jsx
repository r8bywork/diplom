import { Button, Form, Input, Radio, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { AddHouse } from "../AddHouse/AddHouse";

const AddFeedPage = () => {
	const [name, setFeedType] = useState("");
	const [balance, setRemainingAmount] = useState("");
	const [daily_requirement, setDailyRequirement] = useState("");
	const [selectedDataSource, setSelectedDataSource] = useState("new_feed");

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
		try {
			const response = await axios.post(
				"http://localhost:3001/feedAndAddivitives/update",
				feedAndAddivitives
			);
			response.status === 200
				? message.success("Вы успешно добавили новый вид корма!")
				: message.success("Ошибка!");
			return response.data;
		} catch (error) {
			throw new Error(error.response.data);
		}
	};

	const handleDataSourceChange = (e) => {
		setSelectedDataSource(e.target.value);
	};

	return (
		<>
			<Radio.Group
				onChange={handleDataSourceChange}
				value={selectedDataSource}
				style={{ paddingRight: 25 }}
			>
				<Radio.Button value="new_feed">Добавить корм</Radio.Button>
				<Radio.Button value="new_house">Добавить домик</Radio.Button>
			</Radio.Group>

			{selectedDataSource === "new_feed" ? (
				<Form onFinish={handleAddFeed}>
					<h1>Добавление комбикорма и добавок</h1>
					<Form.Item label="Наимнование:" name="name">
						<Input value={name} onChange={handleFeedTypeChange} />
					</Form.Item>
					<Form.Item label="Остаток:" name="balance">
						<Input value={balance} onChange={handleRemainingAmountChange} />
					</Form.Item>
					<Form.Item label="Дневная потребность:" name="daily_requirement">
						<Input
							value={daily_requirement}
							onChange={handleDailyRequirementChange}
						/>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Добавить комбикорм
						</Button>
					</Form.Item>
				</Form>
			) : (
				<AddHouse />
			)}
		</>
	);
};

export { AddFeedPage };

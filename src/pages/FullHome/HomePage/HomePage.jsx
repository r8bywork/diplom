import { Card, Input, Modal, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import "./HomePage.css";
import { cards } from "./mock";
const { Meta } = Card;

const HomePage = () => {
	const [visible, setVisible] = useState(false);
	const [card, setCard] = useState({});
	const [inputValues, setInputValues] = useState({});
	const [newInputValues, setNewInputValues] = useState({});
	const startDate =
		dayjs().startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z";
	const endDate =
		dayjs().add(1, "day").startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS") +
		"Z";

	// const showModal = (card) => {
	// 	setVisible(true);
	// 	setCard(card);
	// 	setInputValues({});
	// };
	const userId = localStorage.getItem("id");
	const showModal = (card) => {
		setVisible(true);
		setCard(card);
		setInputValues({});

		// Get the current values from the database
		const getCurrentValues = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3001/row/getAllByExpression/${userId}`,
					{
						params: {
							startDate: `${startDate}`,
							endDate: `${endDate}`,
						},
					}
				);
				const rowData = response.data[0];
				const currentValues = rowData || {};

				// Update the inputValues state with the current values
				const updatedInputValues = {};
				card.fields.forEach((field) => {
					const { key } = field;
					if (currentValues.hasOwnProperty(key)) {
						updatedInputValues[key] = currentValues[key];
					}
				});
				setNewInputValues(updatedInputValues);
			} catch (error) {
				console.error("Error fetching current values:", error);
			}
		};

		getCurrentValues();
	};

	const handleOk = async () => {
		setVisible(false);
		try {
			const date = new Date();
			const updateResponse = await axios.put(
				`http://localhost:3001/row/update/${userId}`,
				{
					dairies: [
						{
							date: date.toISOString(),
							milk_production: 0,
							milk_truck_order: 0,
							gross_yield: 0,
							milk_consumption: 0,
							heifers: 0,
							cows: 0,
							abortions: 0,
							young_animal_losses: 0,
							stillbirths: 0,
							losses_during_fattening_of_cows: 0,
							losses_of_main_herd_cows: 0,
							...inputValues,
						},
					],
				}
			);
			setInputValues({});
			updateResponse.status === 200
				? message.success("Данные успешно добавлены")
				: message.error("Ошибка");
			return updateResponse.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const handleCancel = () => {
		setVisible(false);
		setInputValues({});
	};

	const handleInputChange = (e, key) => {
		setInputValues({
			...inputValues,
			[key]: e.target.value,
		});
	};

	return (
		<div className="App">
			<div className="card-container">
				{cards.map((card) => (
					<Card
						key={card.id}
						hoverable
						style={{ width: 300, margin: 16 }}
						onClick={() => showModal(card)}
					>
						<Meta title={card.title} description={card.description} />
						<img
							alt="card-img"
							src={card.image}
							style={{ marginTop: 16, height: 170, width: 250 }}
						/>
					</Card>
				))}
			</div>
			<Modal
				title={card.title}
				open={visible}
				onOk={handleOk}
				onCancel={handleCancel}
				okText="Сохранить"
				cancelText="Закрыть"
			>
				<div>
					{card.fields &&
						card.fields.map((field) => (
							<div key={field.key}>
								<label>{field.label + `:${newInputValues[field.key]}`}</label>
								<br />
								<Input
									// placeholder={`Введите количество ${field.label}`}
									placeholder={`Введите количество`}
									// value={inputValues[field.key] || ""}
									value={inputValues[field.key] || ""}
									onChange={(e) => handleInputChange(e, field.key)}
									type={field.type || "text"}
									style={{ marginBottom: 16 }}
								/>
							</div>
						))}
				</div>
			</Modal>
		</div>
	);
};

export { HomePage };

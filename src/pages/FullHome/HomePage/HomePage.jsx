import { Card, Input, Modal, Select, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import "./HomePage.css";
import { cards } from "./mock";
const { Meta } = Card;

const HomePage = () => {
	const [visible, setVisible] = useState(false);
	const [card, setCard] = useState({});
	const [inputValues, setInputValues] = useState({});

	const showModal = (card) => {
		setVisible(true);
		setCard(card);
		setInputValues({});
	};
	const userId = localStorage.getItem("id");

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

	// const fetchData = async () => {
	// 	console.clear();
	// 	const date = new Date();
	// 	date.setHours(date.getHours() + 3);
	// 	const response = await axios.get(`http://localhost:3001/row/get/${userId}`);
	// 	if (response == null) {
	// 		axios
	// 			.put("http://localhost:3001/row/update", {
	// 				date: date,
	// 				milk_production: 0,
	// 				milk_truck_order: 0,
	// 				gross_yield: 0,
	// 				milk_consumption: 0,
	// 				heifers: 0,
	// 				cows: 0,
	// 				hutch_number: 0,
	// 				calves_per_hutch: 0,
	// 				abortions: 0,
	// 				young_animal_losses: 0,
	// 				stillbirths: 0,
	// 				losses_during_fattening_of_cows: 0,
	// 				losses_of_main_herd_cows: 0,
	// 			})
	// 			.then((response) => {
	// 				// console.log(response.data);
	// 			})
	// 			.catch((error) => {
	// 				console.error(error);
	// 			});
	// 	} else {
	// 		setDocumentId(response.data._id);
	// 	}
	// };

	// useEffect(() => {
	// 	fetchData();
	// }, []);

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
								<label>{field.label}</label>
								<br />
								{field.type === "select" ? (
									<Select
										placeholder={`Выберите ${field.label}`}
										value={inputValues[field.key] || ""}
										onChange={(value) =>
											handleInputChange({ target: { value } }, field.key)
										}
										style={{ marginBottom: 16, width: 300 }}
									>
										{field.options &&
											field.options.map((option) => (
												<Select.Option key={option.value} value={option.value}>
													{option.label}
												</Select.Option>
											))}
									</Select>
								) : (
									<Input
										// placeholder={`Введите количество ${field.label}`}
										placeholder={`Введите количество`}
										value={inputValues[field.key] || ""}
										onChange={(e) => handleInputChange(e, field.key)}
										type={field.type || "text"}
										style={{ marginBottom: 16 }}
									/>
								)}
							</div>
						))}
				</div>
			</Modal>
		</div>
	);
};

export { HomePage };

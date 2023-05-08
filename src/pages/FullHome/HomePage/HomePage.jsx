import { Card, Input, Modal, Select } from "antd";
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

	const handleOk = () => {
		setVisible(false);
		console.log("Form data:", inputValues);
		setInputValues({});
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
							style={{ marginTop: 16, height: 170 }}
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

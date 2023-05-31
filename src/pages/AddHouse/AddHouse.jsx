import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";

const AddHouse = () => {
	const [name, setName] = useState("");
	const [cowsCount, setCowsCount] = useState(0);

	const handleSave = async () => {
		try {
			const id = localStorage.getItem("username");
			const requestBody = {
				houses: [
					{
						name: name,
						cowsCount: cowsCount,
					},
				],
				username: id,
			};

			const response = await axios.post(
				"http://localhost:3001/houses/add",
				requestBody
			);
			console.log(response.data); // Handle the response as needed

			// Reset the form fields
			setName("");
			setCowsCount(0);
			response.status === 200
				? message.success("Вы успешно добавили новый вид корма!")
				: message.success("Ошибка!");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Form onFinish={handleSave}>
			<h1>Добавление домика и количества голов</h1>
			<Form.Item label="Наименование домика" name="name">
				<Input value={name} onChange={(e) => setName(e.target.value)} />
			</Form.Item>
			<Form.Item label="Количество голов" name="cowsCount">
				<Input
					type="number"
					value={cowsCount}
					onChange={(e) => setCowsCount(e.target.value)}
				/>
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
					Сохранить изменения
				</Button>
			</Form.Item>
		</Form>
	);
};

export { AddHouse };

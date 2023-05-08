import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
	const [userData, setUserData] = useState(null);
	const navigate = useNavigate();

	const fetchUserData = async () => {
		const token = localStorage.getItem("token");
		const response = await axios.get("http://localhost:3001/auth/get", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		setUserData(response.data);
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	if (!userData) {
		return null; // или что-то другое, что покажет пользователю, что данные еще загружаются
	}
	const onFinish = async (values) => {
		console.log(values);
		// updateUserData(values);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		message.success("Вы успешно вышли из приложения");
		navigate("/login");
	};

	return (
		<Form initialValues={userData?.user} onFinish={onFinish}>
			<Form.Item label="Логин" name="username">
				<Input disabled />
			</Form.Item>
			<Form.Item label="Почта" name="email">
				<Input />
			</Form.Item>
			<Form.Item label="Номер телефона" name="phoneNumber">
				<Input />
			</Form.Item>
			<Form.Item label="Наименование организации" name="organizationName">
				<Input />
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
					Сохранить изменения
				</Button>
				<Button type="primary" onClick={handleLogout} danger={true}>
					Выход
				</Button>
			</Form.Item>
		</Form>
	);
};

export { SettingsPage };

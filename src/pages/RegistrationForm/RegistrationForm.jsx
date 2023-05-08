import { Button, Form, Input } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
	const navigate = useNavigate();
	const onFinish = async (values) => {
		const { username, password, email, phoneNumber, organizationName } = values;
		console.clear();
		try {
			console.log("Success:", values);
			const response = await axios.post("http://localhost:3001/auth/register", {
				username,
				password,
				email,
				phoneNumber,
				organizationName,
			});

			// response.status === 200 ? navigation.navigate("HomePage") : null;

			if (response.status === 200) {
				navigate("/login");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<Form
				name="registration"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				style={{ width: "50%", margin: "auto" }}
			>
				<Form.Item
					label="Почта"
					name="email"
					rules={[
						{ required: true, message: "Пожалуйста, введите почту!" },
						{
							type: "email",
							message: "Пожалуйста, введите правильный адрес почты!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Логин"
					name="username"
					rules={[{ required: true, message: "Пожуйлста, введите ваш логин!" }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Пароль"
					name="password"
					rules={[
						{ required: true, message: "Пожалуйста, введите ваш пароль!" },
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					label="Наименование организации"
					name="organizationName"
					rules={[
						{
							required: true,
							message: "Пожалуйста, введите наименование организации!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Номер телефона"
					name="phoneNumber"
					rules={[
						{
							required: true,
							message: "Пожалуйста, введите номер телефона!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Зарегистрироваться
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export { RegistrationForm };

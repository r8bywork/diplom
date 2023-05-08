import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
	const navigate = useNavigate();
	const onFinish = async (values) => {
		const { username, password } = values;
		console.clear();
		try {
			console.log("Success:", values);
			const response = await axios.post("http://localhost:3001/auth/login", {
				username,
				password,
			});

			if (response.status === 200) {
				localStorage.setItem("token", response.data.token);
				navigate("/");
				message.success("Вы успешно вошли в приложение!");
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
				name="login"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				style={{ width: "50%", margin: "auto" }}
			>
				<Form.Item
					label="Логин"
					name="username"
					rules={[
						{ required: true, message: "Пожалуйста, введите свою почту!" },
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Пароль"
					name="password"
					rules={[
						{ required: true, message: "Пожалуйста, введите свой пароль!" },
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item name="remember" valuePropName="checked">
					<Checkbox>Запомнить данные</Checkbox>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Войти
					</Button>
				</Form.Item>

				<Form.Item>
					<Button type="link">Зарегистрироваться</Button>
					<Button type="link">Забыли пароль?</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export { LoginPage };

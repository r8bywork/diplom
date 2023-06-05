import { Form, Input, Modal, message } from "antd";
import axios from "axios";
import React from "react";

const CreateUserForm = ({ visible, onCancel, fetchData }) => {
	const [form] = Form.useForm();
	const userId = localStorage.getItem("id");

	const createWorker = async (values) => {
		try {
			const body = {
				...values,
			};

			const response = await axios.post(
				`http://localhost:3001/worker/${userId}`,
				body
			);
			response.status === 200
				? message.success("Пользователь успешно создан!")
				: message.error("Ошибка!");
			fetchData();
			onCancel();
		} catch (error) {
			console.error("Error creating worker:", error);
		}
	};

	const handleSave = (values) => {
		const { role } = values;
		const rolesArray = role.split(",").map((role) => role.trim());
		const updatedValues = { ...values, roles: rolesArray };

		console.log("Form values:", updatedValues);
		createWorker(updatedValues);
	};

	return (
		<Modal
			open={visible}
			title="Пользователи"
			onCancel={onCancel}
			onOk={() => {
				form.validateFields().then((values) => {
					form.resetFields();
					handleSave(values);
				});
			}}
		>
			<Form form={form}>
				<Form.Item
					name="name"
					label="ФИО"
					rules={[
						{
							required: true,
							message: "Пожалуйста, введите имя!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="username"
					label="Логин"
					rules={[
						{
							required: true,
							message: "Пожалуйста, введите логин!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="password"
					label="Пароль"
					rules={[
						{
							required: true,
							message: "Пожалуйста, введите пароль!",
						},
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					name="role"
					label="Роль"
					rules={[
						{
							required: true,
							message: "Пожалуйста, введите роль!",
						},
					]}
				>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default CreateUserForm;

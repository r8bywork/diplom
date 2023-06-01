import { Button, Form, Input, Modal, Table, Tag, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AddWorkers = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [userData, setUserData] = useState(null);
	const userId = localStorage.getItem("id");
	const columns = [
		{
			title: "Логин",
			dataIndex: "username",
			key: "username",
		},
		{
			title: "Пароль",
			dataIndex: "password",
			key: "password",
		},
		{
			title: "Роль",
			dataIndex: "roles",
			key: "roles",
			render: (roles) => (
				<>
					{roles.map((role) => (
						<Tag key={role}>{role}</Tag>
					))}
				</>
			),
		},
		{
			title: "Действия",
			dataIndex: "_id",
			key: "actions",
			render: (id) => (
				<Button type="link" danger onClick={() => handleDelete(id)}>
					Удалить
				</Button>
			),
		},
	];

	const handleDelete = async (id) => {
		try {
			console.log(userId, id);
			const response = await axios.delete(
				"http://localhost:3001/worker/delete",
				{
					data: {
						userId,
						workerId: id,
					},
				}
			);
			response.status === 200
				? message.success("Пользователь успешно удален!")
				: message.error("Ошибка!");
			console.log(response.data);
		} catch (error) {
			console.error("Error creating worker:", error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3001/worker/get/${userId}`
				);
				setUserData(response.data.workers.workers);
				console.log(response);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const createWorker = async (values) => {
		try {
			const body = {
				worker: [
					{
						...values,
					},
				],
			};

			const response = await axios.post(
				`http://localhost:3001/worker/${userId}`,
				body
			);

			// Do something with the response...
			console.log(response.data);
		} catch (error) {
			console.error("Error creating worker:", error);
		}
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleSave = (values) => {
		const { role } = values;
		console.log(values);
		const rolesArray = role.split(",").map((role) => role.trim());
		const updatedValues = { ...values, roles: rolesArray };

		console.log("Form values:", updatedValues);
		createWorker(updatedValues);
		setIsModalVisible(false);
	};

	const CreateUserForm = ({ visible, onCancel, onCreate }) => {
		const [form] = Form.useForm();

		return (
			<Modal
				open={visible}
				title="Пользователи"
				onCancel={onCancel}
				onOk={() => {
					form.validateFields().then((values) => {
						form.resetFields();
						onCreate(values);
					});
				}}
			>
				<Form form={form}>
					<Form.Item
						name="username"
						label="Username"
						rules={[
							{
								required: true,
								message: "Please input the username",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="password"
						label="Password"
						rules={[
							{
								required: true,
								message: "Please input the password",
							},
						]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						name="role"
						label="Role"
						rules={[
							{
								required: true,
								message: "Please input the role",
							},
						]}
					>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		);
	};

	return (
		<div>
			<Button type="primary" onClick={showModal} style={{ marginBottom: 15 }}>
				Создать пользователя
			</Button>
			<Table columns={columns} dataSource={userData} />
			<CreateUserForm
				visible={isModalVisible}
				onCancel={handleCancel}
				onCreate={handleSave}
			/>
		</div>
	);
};

export default AddWorkers;

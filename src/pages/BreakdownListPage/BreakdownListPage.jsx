import { Button, Form, Input, Modal, Select, Table } from "antd";
import React, { useState } from "react";

const { Option } = Select;

const BreakdownListPage = () => {
	const [breakdowns, setBreakdowns] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleAddBreakdown = () => {
		form.validateFields().then((values) => {
			const newBreakdown = {
				id: Date.now(),
				name: values.name,
				description: values.description,
				status: "На рассмотрении",
			};

			setBreakdowns((prevBreakdowns) => [...prevBreakdowns, newBreakdown]);
			form.resetFields();
			setIsModalVisible(false);
		});
	};

	const handleStatusChange = (value, record) => {
		const updatedBreakdowns = breakdowns.map((breakdown) => {
			if (breakdown.id === record.id) {
				return { ...breakdown, status: value };
			}
			return breakdown;
		});
		setBreakdowns(updatedBreakdowns);
	};

	const presetOptions = ["В прогрессе", "На рассмотрении", "Заверешено"];

	const columns = [
		{ title: "Наименование", dataIndex: "name", key: "name" },
		{ title: "Описание", dataIndex: "description", key: "description" },
		{
			title: "Статус",
			dataIndex: "status",
			key: "status",
			render: (text, record) => (
				<Select
					value={text}
					onChange={(value) => handleStatusChange(value, record)}
				>
					{presetOptions.map((option) => (
						<Option value={option} key={option}>
							{option}
						</Option>
					))}
				</Select>
			),
		},
	];

	return (
		<div>
			<h1>Список поломок</h1>
			<Button type="primary" onClick={showModal} style={{ marginBottom: 15 }}>
				Добавить поломку
			</Button>
			<Table dataSource={breakdowns} columns={columns} />

			<Modal
				title="Добавление новой поломки"
				open={isModalVisible}
				onCancel={handleCancel}
				footer={[
					<Button key="cancel" onClick={handleCancel}>
						Отменить
					</Button>,
					<Button key="add" type="primary" onClick={handleAddBreakdown}>
						Добавить
					</Button>,
				]}
			>
				<Form form={form} layout="vertical">
					<Form.Item
						name="name"
						label="Наименование"
						rules={[
							{
								required: true,
								message: "Пожалуйста, введите наименование поломки",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="description"
						label="Описание"
						rules={[
							{ required: true, message: "Пожалуйста, заполните описание" },
						]}
					>
						<Input.TextArea rows={4} />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export { BreakdownListPage };

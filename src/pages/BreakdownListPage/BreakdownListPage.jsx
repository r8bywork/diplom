import { Button, Checkbox, Form, Input, Modal, Select, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
const { Option } = Select;

const BreakdownListPage = () => {
	const [breakdowns, setBreakdowns] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();
	const [selectedFilters, setSelectedFilters] = useState([]);
	const [isFilterDropdownVisible, setIsFilterDropdownVisible] = useState(false);
	const [selectedBreakdown, setSelectedBreakdown] = useState(null);

	const id = localStorage.getItem("id");

	useEffect(() => {
		const fetchBreakdowns = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3001/break/breakdowns/${id}`
				);
				const breakdownsData = response.data.breakdowns;
				setBreakdowns(breakdownsData);
			} catch (error) {
				console.log(error);
				throw new Error("Ошибка при получении поломок");
			}
		};

		fetchBreakdowns();
	}, [id]);

	const showModal = (breakdown) => {
		form.resetFields();
		setSelectedBreakdown(breakdown);
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		form.resetFields();
		setSelectedBreakdown(null);
		setIsModalVisible(false);
	};

	const handleAddBreakdown = () => {
		form.validateFields().then(async (values) => {
			const { description } = values;
			const workerId = localStorage.getItem("id");

			try {
				let response;
				if (selectedBreakdown) {
					response = await axios.put(
						`http://localhost:3001/break/update/${selectedBreakdown._id}`,
						{
							description,
						}
					);
				} else {
					response = await axios.post(
						"http://localhost:3001/break/createBreak",
						{
							workerId,
							description,
						}
					);
				}

				const newBreakdown = response.data.breakdown;

				let updatedBreakdowns;
				if (selectedBreakdown) {
					updatedBreakdowns = breakdowns.map((breakdown) => {
						if (breakdown._id === selectedBreakdown._id) {
							return { ...breakdown, description };
						}
						return breakdown;
					});
				} else {
					updatedBreakdowns = [...breakdowns, newBreakdown];
				}

				setBreakdowns(updatedBreakdowns);
				form.resetFields();
				setIsModalVisible(false);
			} catch (error) {
				console.log(error);
				throw new Error("Ошибка при создании/изменении поломки");
			}
		});
	};

	const transformData = (data) => {
		return data?.map((item) => {
			return {
				...item,
				key: item._id,
			};
		});
	};

	const handleStatusChange = async (value, record) => {
		const updatedBreakdowns = breakdowns.map((breakdown) => {
			if (breakdown._id === record._id) {
				return { ...breakdown, status: value };
			}
			return breakdown;
		});
		setBreakdowns(updatedBreakdowns);

		if (value === "Сделано") {
			try {
				await axios.delete(
					`http://localhost:3001/break/breakdowns/${record._id}`
				);
				setBreakdowns((prevBreakdowns) =>
					prevBreakdowns.filter((breakdown) => breakdown._id !== record._id)
				);
			} catch (error) {
				console.log(error);
				throw new Error("Ошибка при удалении поломки");
			}
		} else {
			showModal(record);
		}
	};

	const presetOptions = [
		"На рассмотрении",
		"В обработке",
		"Сделано",
		"Переделать",
	];

	const handleResetFilter = () => {
		setSelectedFilters([]);
		setIsFilterDropdownVisible(false);
	};

	const columns = [
		{ title: "Кто добавил", dataIndex: "name", key: "name" },
		{ title: "Описание", dataIndex: "description", key: "description" },
		{
			title: "Статус",
			dataIndex: "status",
			key: "status",
			filters: presetOptions.map((status) => ({ text: status, value: status })),
			onFilter: (value, record) => record.status === value,
			filteredValue: selectedFilters,
			filterDropdownOpen: isFilterDropdownVisible,
			onFilterDropdownOpenChange: (visible) => {
				setIsFilterDropdownVisible(visible);
			},
			filterDropdown: (
				<div style={{ padding: 8 }}>
					<Checkbox.Group
						options={presetOptions}
						value={selectedFilters}
						onChange={(values) => setSelectedFilters(values)}
						style={{ display: "block" }}
					/>
					<Button
						type="primary"
						onClick={handleResetFilter}
						size="small"
						style={{ marginTop: 8 }}
					>
						Сбросить
					</Button>
				</div>
			),
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
		{
			title: "Действия",
			key: "actions",
			render: (text, record) => {
				const currentUser = id;
				if (record.addedBy.toString() === currentUser) {
					return (
						<span>
							<Button type="link" onClick={() => showModal(record)}>
								Изменить
							</Button>
						</span>
					);
				}
				return (
					<span>
						<Button type="link" disabled>
							Изменить
						</Button>
					</span>
				);
			},
		},
	];

	return (
		<div>
			<h1>Список поломок</h1>
			<Button
				type="primary"
				onClick={() => showModal(null)}
				style={{ marginBottom: 15 }}
			>
				Добавить поломку
			</Button>
			<Table
				dataSource={transformData(breakdowns)}
				columns={columns}
				pagination={false}
			/>

			<Modal
				title={
					selectedBreakdown ? "Изменение поломки" : "Добавление новой поломки"
				}
				open={isModalVisible}
				onCancel={handleCancel}
				footer={[
					<Button key="cancel" onClick={handleCancel}>
						Отменить
					</Button>,
					<Button key="add" type="primary" onClick={handleAddBreakdown}>
						{selectedBreakdown ? "Изменить" : "Добавить"}
					</Button>,
				]}
			>
				<Form form={form} layout="vertical">
					<Form.Item
						name="description"
						label="Описание"
						initialValue={selectedBreakdown && ""}
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

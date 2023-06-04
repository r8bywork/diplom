import { Button, Checkbox, Input, Modal, Table, Tag, message } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import CreateUserForm from "./CreateUserForm";

const AddWorkers = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalVisible2, setIsModalVisible2] = useState(false);
	const [selectedRoles, setSelectedRoles] = useState([]);
	const [inputRole, setInputRole] = useState("");
	const [workerId, setWorkerId] = useState(null);

	const [userData, setUserData] = useState(null);
	const [searchValue, setSearchValue] = useState("");
	const [filteredData, setFilteredData] = useState(null);
	const [rolesOptions, setRolesOptions] = useState([]);
	const [isFilterDropdownVisible, setIsFilterDropdownVisible] = useState(false);
	const [selectedFilters, setSelectedFilters] = useState([]);
	const userId = localStorage.getItem("id");

	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [editedUsername, setEditedUsername] = useState("");
	const [name, setEditedName] = useState("");
	const [editedPassword, setEditedPassword] = useState("");
	const [editedWorkerId, setEditedWorkerId] = useState(null);

	const handleDeleteRole = async (index, id) => {
		const response = await axios.delete(
			"http://localhost:3001/worker/deleteRole",
			{
				data: {
					userId,
					workerId: id,
					roleIndex: index,
				},
			}
		);
		response.status === 200
			? message.success("Роль успешно удалена!")
			: message.error("Ошибка!");
	};

	const renderRoles = (roles, id) => {
		return (
			<>
				{roles.map((role, index) => (
					<Tag
						key={index}
						closable
						onClose={() => {
							handleDeleteRole(index, id);
						}}
					>
						{role}
					</Tag>
				))}
				<Button
					type="primary"
					shape="circle"
					size="small"
					onClick={() => {
						setIsModalVisible2(true);
						setWorkerId(id);
					}}
				>
					+
				</Button>
			</>
		);
	};

	const columns = [
		{
			title: "Имя",
			dataIndex: "name",
			key: "name",
			sorter: (a, b) => a.name.localeCompare(b.name), // Add sorter function for username column
		},
		{
			title: "Логин",
			dataIndex: "username",
			key: "username",
			sorter: (a, b) => a.username.localeCompare(b.username), // Add sorter function for username column
		},
		// {
		// 	title: "Пароль",
		// 	dataIndex: "password",
		// 	key: "password",
		// },
		{
			title: "Роль",
			dataIndex: "roles",
			key: "roles",
			render: (roles, record) => {
				return renderRoles(roles, record._id);
			},
			filters: rolesOptions.map((role) => ({ text: role, value: role })), // Use rolesOptions to generate filter options
			onFilter: (value, record) => record.roles.includes(value),
			filteredValue: selectedFilters,
			filterDropdownOpen: isFilterDropdownVisible,
			onFilterDropdownOpenChange: (visible) => {
				setIsFilterDropdownVisible(visible);
			},
			filterDropdown: (
				<div style={{ padding: 8 }}>
					<Checkbox.Group
						onChange={(values) => setSelectedFilters(values)}
						style={{ display: "block" }}
					>
						{rolesOptions.map((role) => (
							<Checkbox key={role} value={role}>
								{role}
							</Checkbox>
						))}
					</Checkbox.Group>
					<Button
						type="primary"
						onClick={() => {
							setSelectedFilters([]);
							setIsFilterDropdownVisible(false);
						}}
						size="small"
						style={{ marginTop: 8 }}
					>
						Сбросить
					</Button>
				</div>
			),
		},
		{
			title: "Действия",
			dataIndex: "_id",
			key: "actions",
			render: (id) => (
				<>
					<Button type="link" onClick={() => handleEdit(id)}>
						Изменить
					</Button>
					<Button type="link" danger onClick={() => handleDelete(id)}>
						Удалить
					</Button>
				</>
			),
		},
	];

	const handleEdit = async (id) => {
		// Find the worker by id
		const editedWorker = userData.find((worker) => worker._id === id);

		// Set the values of the worker to be edited in the state variables
		setEditedName(editedWorker.name);
		setEditedUsername(editedWorker.username);
		// setEditedPassword(editedWorker.password);
		setEditedWorkerId(id);

		// Show the edit modal
		setIsEditModalVisible(true);
	};

	const handleEditCancel = () => {
		setIsEditModalVisible(false);
		// Reset the edited values
		setEditedUsername("");
		setEditedPassword("");
		setEditedWorkerId(null);
	};

	const handleEditSave = async () => {
		if (!name || !editedUsername) {
			message.error("Name and Username fields cannot be empty");
			return;
		}
		// Make the request to update the worker
		try {
			const requestBody = {
				userId,
				workerId: editedWorkerId,
				workers: [
					{
						name: name,
						username: editedUsername,
					},
				],
			};

			// Добавьте проверку наличия нового пароля
			if (editedPassword) {
				requestBody.workers[0].password = editedPassword;
			}

			const response = await axios.put(
				"http://localhost:3001/worker/update",
				requestBody
			);

			response.status === 200
				? message.success("Worker updated successfully!")
				: message.error("Error updating worker!");

			setIsEditModalVisible(false);
			fetchData();
		} catch (error) {
			message.error("Error updating worker");
		}
	};

	const handleDelete = async (id) => {
		try {
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
			fetchData();
		} catch (error) {
			console.error("Error creating worker:", error);
		}
	};

	const fetchData = useCallback(async () => {
		try {
			const response = await axios.get(
				`http://localhost:3001/worker/get/${userId}`
			);
			setUserData(response.data.workers.workers);

			// Extract unique roles from the users
			const roles = Array.from(
				new Set(response.data.workers.workers.flatMap((user) => user.roles))
			);
			setRolesOptions(roles);
		} catch (error) {
			console.log(error);
		}
	}, [userId]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	useEffect(() => {
		if (userData) {
			const filteredData = userData.filter((user) =>
				user.username.toLowerCase().includes(searchValue.toLowerCase())
			);
			setFilteredData(filteredData);
		}
	}, [userData, searchValue]);

	const handleRoleChange = (checkedValues) => {
		setInputRole(checkedValues.join(",") + ",");
		setSelectedRoles(checkedValues);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		setIsModalVisible2(false);
		setSelectedRoles([]);
		setInputRole("");
	};

	const handleOk = async () => {
		// Check if inputRole is empty
		if (inputRole.trim() === "") {
			message.error("Role cannot be empty");
			return;
		}

		// Remove comma if the inputRole ends with a comma
		let roleToAdd = inputRole.trim();
		if (roleToAdd.endsWith(",")) {
			roleToAdd = roleToAdd.slice(0, -1);
		}

		// Check if the role already exists for the worker
		const worker = userData.find((user) => user._id === workerId);
		if (worker && worker.roles.includes(roleToAdd)) {
			message.error("This role is already assigned to the worker");
			return;
		}

		try {
			const response = await axios.put("http://localhost:3001/worker/addRole", {
				name,
				userId,
				workerId: workerId,
				roles: roleToAdd,
			});
			response.status === 200
				? message.success("Роль успешно удалена!")
				: message.error("Ошибка!");
			setIsModalVisible2(false);
			setInputRole("");
			setSelectedRoles([]);
			fetchData();
		} catch (error) {
			message.error("Ошибка при добавлении ролей");
		}
	};

	const transformData = (data) => {
		return data?.map((item) => {
			return {
				...item,
				key: item._id,
			};
		});
	};

	return (
		<div>
			<Button
				type="primary"
				onClick={() => setIsModalVisible(true)}
				style={{ marginBottom: 15 }}
			>
				Создать пользователя
			</Button>
			<Input
				placeholder="Поиск по имени"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				style={{ marginBottom: 15, width: 200, marginLeft: 15 }}
			/>
			{userData && (
				<Table
					columns={columns}
					dataSource={transformData(filteredData || userData)}
				/>
			)}
			<CreateUserForm visible={isModalVisible} onCancel={handleCancel} />

			<Modal
				title="Добавить роли"
				open={isModalVisible2}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Input
					placeholder="Введите роль"
					value={inputRole}
					onChange={(e) => setInputRole(e.target.value)}
					style={{ marginBottom: 10 }}
				/>
				<Checkbox.Group onChange={handleRoleChange} value={selectedRoles}>
					{rolesOptions.map((role) => (
						<Checkbox key={role} value={role}>
							{role}
						</Checkbox>
					))}
				</Checkbox.Group>
			</Modal>
			<Modal
				title="Изменить рабочего"
				open={isEditModalVisible}
				onOk={handleEditSave}
				onCancel={handleEditCancel}
			>
				<Input
					placeholder="Name"
					value={name}
					onChange={(e) => setEditedName(e.target.value)}
					style={{ marginBottom: 10 }}
				/>
				<Input
					placeholder="Username"
					value={editedUsername}
					onChange={(e) => setEditedUsername(e.target.value)}
					style={{ marginBottom: 10 }}
				/>
				<Input.Password
					placeholder="Password"
					value={editedPassword}
					onChange={(e) => setEditedPassword(e.target.value)}
					style={{ marginBottom: 10 }}
				/>
			</Modal>
		</div>
	);
};

export default AddWorkers;

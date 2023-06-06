import { Menu, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddFeedPage } from "../AddFeedPage/AddFeedPage";
import AddWorkers from "../AddWorkers/AddWorkerks";
import { BreakdownListPage } from "../BreakdownListPage/BreakdownListPage";
import { SettingsPage } from "../SettingsPage/SettingsPage";
import { DataViewPage } from "./DataViewPage/DataViewPage";
import { HomePage } from "./HomePage/HomePage";

const FullHome = () => {
	const handleLogout = () => {
		localStorage.removeItem("id");
		localStorage.removeItem("username");
		localStorage.removeItem("token");
		message.success("Вы успешно вышли из приложения");
		navigate("/login");
	};
	const roles = localStorage.getItem("role");
	const isAdmin = roles.includes("admin");
	const menuItems = [
		{
			key: "1",
			label: "Главная страница",
			component: <HomePage />,
		},
		{ key: "2", label: "Добавление данных", component: <AddFeedPage /> },
		{ key: "3", label: "Просмотр всех данных", component: <DataViewPage /> },
		{ key: "4", label: "Поломки", component: <BreakdownListPage /> },
	];

	if (isAdmin) {
		menuItems.push({ key: "5", label: "Рабочие", component: <AddWorkers /> });
	}

	menuItems.push({
		key: "6",
		label: "Настройки профиля",
		component: <SettingsPage />,
	});

	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const [currentMenu, setCurrentMenu] = useState(menuItems[0].key);
	const handleMenuClick = ({ key }) => {
		setCurrentMenu(key);
	};

	useEffect(() => {
		const checkAuthorization = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await axios.get(
					"http://localhost:3001/auth/findUser",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				// console.log(response);
				localStorage.setItem("role", response.data);
				// console.log(localStorage.getItem("role"));
			} catch (error) {
				navigate("/login");
				console.log(error);
			}
			setLoading(false);
		};

		const fetchUserData = async () => {
			const token = localStorage.getItem("token");
			const response = await axios.get("http://localhost:3001/auth/get", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			// console.log(response);
			if (response.data.worker) {
				localStorage.setItem("id", response.data.worker._id);
				// localStorage.setItem("username", response.data.worker.username);
			} else {
				localStorage.setItem("id", response.data.user._id);
				localStorage.setItem("username", response.data.user.username);
			}
		};

		checkAuthorization();
		fetchUserData();
	}, [navigate]);

	if (loading) {
		return <div>Loading...</div>; // Render loading state until data is fetched
	}

	return (
		<div>
			<Menu
				mode="horizontal"
				selectedKeys={[currentMenu]}
				onClick={handleMenuClick}
				items={menuItems}
			/>
			<div style={{ marginTop: "20px" }}>
				{menuItems.find((item) => item.key === currentMenu).component}
			</div>
		</div>
	);
};

export { FullHome };

import { Menu } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddFeedPage } from "../AddFeedPage/AddFeedPage";
import { SettingsPage } from "../SettingsPage/SettingsPage";
import { DataViewPage } from "./DataViewPage/DataViewPage";
import { HomePage } from "./HomePage/HomePage";

const menuItems = [
	{ key: "1", title: "Главная страница", component: <HomePage /> },
	{ key: "2", title: "Добавить корма", component: <AddFeedPage /> },
	{ key: "3", title: "Просмотр всех данных", component: <DataViewPage /> },
	{ key: "4", title: "Настройки профиля", component: <SettingsPage /> },
];

const FullHome = () => {
	const navigate = useNavigate();
	const [currentMenu, setCurrentMenu] = useState(menuItems[2].key);

	const handleMenuClick = ({ key }) => {
		setCurrentMenu(key);
	};

	const checkAuthorization = async () => {
		try {
			const token = localStorage.getItem("token");
			await axios.get("http://localhost:3001/auth/findUser", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		} catch (error) {
			console.log(error);
			navigate("/login");
		}
	};

	// Вызываем функцию для проверки авторизации при загрузке главной страницы
	checkAuthorization();

	return (
		<div>
			<Menu
				mode="horizontal"
				selectedKeys={[currentMenu]}
				onClick={handleMenuClick}
			>
				{menuItems.map((item) => (
					<Menu.Item key={item.key}>{item.title}</Menu.Item>
				))}
			</Menu>
			<div style={{ marginTop: "20px" }}>
				{menuItems.find((item) => item.key === currentMenu).component}
			</div>
		</div>
	);
};

export { FullHome };

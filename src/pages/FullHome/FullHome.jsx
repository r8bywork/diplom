import { Menu } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddFeedPage } from "../AddFeedPage/AddFeedPage";
import { SettingsPage } from "../SettingsPage/SettingsPage";
import { DataViewPage } from "./DataViewPage/DataViewPage";
import { HomePage } from "./HomePage/HomePage";

const FullHome = () => {
	const menuItems = [
		{
			key: "1",
			label: "Главная страница",
			component: <HomePage />,
		},
		{ key: "2", label: "Добавление данных", component: <AddFeedPage /> },
		// { key: "3", label: "Добавить домик", component: <AddHouse /> },
		{ key: "3", label: "Просмотр всех данных", component: <DataViewPage /> },
		{ key: "4", label: "Настройки профиля", component: <SettingsPage /> },
	];
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
				await axios.get("http://localhost:3001/auth/findUser", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
			} catch (error) {
				navigate("/login");
				console.log(error);
			}
			setLoading(false);
		};

		checkAuthorization();
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

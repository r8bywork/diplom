import { Menu } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
		};

		const fetchData = async () => {
			const date = new Date();
			date.setHours(date.getHours() + 3);
			const response = await axios.get("http://localhost:3001/row/getToday");
			if (response.data == null) {
				axios
					.post("http://localhost:3001/row/create", {
						milk_production: 0,
						milk_truck_order: 0,
						gross_yield: 0,
						milk_consumption: 0,
						heifers: 0,
						cows: 0,
						hutch_number: 0,
						calves_per_hutch: 0,
						abortions: 0,
						young_animal_losses: 0,
						stillbirths: 0,
						losses_during_fattening_of_cows: 0,
						losses_of_main_herd_cows: 0,
					})
					.then((response) => {
						// console.log(response.data);
					})
					.catch((error) => {
						console.error(error);
					});
			}
		};

		checkAuthorization();
		fetchData();
	}, [navigate]);

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

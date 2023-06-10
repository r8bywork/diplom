import { Button } from "antd";
import axios from "axios";

const formatDate = (dateString) => {
	const date = new Date(dateString);
	const formattedDate = date.toLocaleDateString("ru-RU", {
		day: "numeric",
		month: "numeric",
		year: "numeric",
	});
	return formattedDate;
};

export const columns = (array) => [
	// export const columns = [
	{
		width: "auto",
		title: "Кол-во молока",
		dataIndex: "milk_production",
		key: "milk_production",
		render: (text, record, index) => {
			if (index > 0) {
				const previousMilk_production = array[index - 1].milk_production;
				const difference = text - previousMilk_production;
				const formattedText = `${text.toFixed(2)} (${
					difference >= 0
						? `+${difference.toFixed(2)}`
						: `${difference.toFixed(2)}`
				})`;
				return formattedText;
			}
			return text.toFixed(2);
		},
	},
	{
		width: "auto",
		title: "Молоковоз",
		dataIndex: "milk_truck_order",
		key: "milk_truck_order",
	},
	// {
	// 	width: "auto",
	// 	title: "Валовый надой",
	// 	dataIndex: "gross_yield",
	// 	key: "gross_yield",
	// },
	{
		width: "auto",
		title: "Валовый надой",
		dataIndex: "gross_yield",
		key: "gross_yield",
		render: (text, record, index) => {
			if (index > 0) {
				const previousDayYield = array[index - 1].gross_yield;
				const difference = text - previousDayYield;
				const formattedText = `${text.toFixed(2)} (${
					difference >= 0
						? `+${difference.toFixed(2)}`
						: `${difference.toFixed(2)}`
				})`;
				return formattedText;
			}
			return text.toFixed(2);
		},
	},
	{
		width: "auto",
		title: "Выпойка молока",
		dataIndex: "milk_consumption",
		key: "milk_consumption",
	},
	{
		width: "auto",
		title: "Нетеля",
		dataIndex: "heifers",
		key: "heifers",
	},
	{
		width: "auto",
		title: "Коровы",
		dataIndex: "cows",
		key: "cows",
	},
	{
		title: "Аборты",
		dataIndex: "abortions",
		key: "abortions",
	},
	{
		width: "auto",
		title: "Падеж молодняка",
		dataIndex: "young_animal_losses",
		key: "young_animal_losses",
	},
	{
		width: "auto",
		title: "Мертворожденные",
		dataIndex: "stillbirths",
		key: "stillbirths",
	},
	{
		width: "auto",
		title: "Падеж коров на откормке",
		dataIndex: "losses_during_fattening_of_cows",
		key: "losses_during_fattening_of_cows",
	},
	{
		width: "auto",
		title: "Падеж коров основного стада",
		dataIndex: "losses_of_main_herd_cows",
		key: "losses_of_main_herd_cows",
	},
	{
		width: "auto",
		title: "Дата создания",
		dataIndex: "date",
		key: "date",
		render: (text) => formatDate(text),
	},
];

export const columnsHouse = (showModal) => [
	{
		title: "Наименование домикаы",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Количество голов в домике",
		dataIndex: "cowsCount",
		key: "cowsCount",
	},
	{
		title: "Действия",
		key: "actions",
		render: (_, record) => (
			<>
				<Button onClick={() => showModal(record)} style={{ marginRight: 8 }}>
					Изменить
				</Button>
				<Button
					onClick={async () => {
						try {
							// console.log(record._id);
							await axios.delete(`http://localhost:3001/houses/${record._id}`);
						} catch (err) {
							console.log(err);
						}
					}}
				>
					Удалить
				</Button>
			</>
		),
	},
];

export const columnsFeed = (showModalFeed) => [
	{
		title: "Наименование",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Остаток",
		dataIndex: "balance",
		key: "balance",
	},
	{
		title: "Дневная потребность",
		dataIndex: "daily_requirement",
		key: "daily_requirement",
	},
	{
		title: "Действия",
		key: "actions",
		render: (_, record) => (
			<>
				<Button
					onClick={() => showModalFeed(record)}
					style={{ marginRight: 8 }}
				>
					Изменить
				</Button>
				<Button
					onClick={async () => {
						try {
							// console.log(record._id);
							await axios.delete(
								`http://localhost:3001/feedAndAddivitives/${record._id}`
							);
						} catch (err) {
							console.log(err);
						}
					}}
				>
					Удалить
				</Button>
			</>
		),
	},
];

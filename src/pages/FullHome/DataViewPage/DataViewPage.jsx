import { DatePicker, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
const { RangePicker } = DatePicker;

const columns = [
	{
		title: "Кол-во молока",
		dataIndex: "milk_production",
		key: "milk_production",
	},
	{
		title: "Молоковоз",
		dataIndex: "milk_truck_order",
		key: "milk_truck_order",
	},
	{
		title: "Валовый надой",
		dataIndex: "gross_yield",
		key: "gross_yield",
	},
	{
		title: "Выпойка молока",
		dataIndex: "milk_consumption",
		key: "milk_consumption",
	},
	{
		title: "Нетеля",
		dataIndex: "heifers",
		key: "heifers",
	},
	{
		title: "Коровы",
		dataIndex: "cows",
		key: "cows",
	},
	{
		title: "Номер домика",
		dataIndex: "hutch_number",
		key: "hutch_number",
	},
	{
		title: "Кол-во в домике",
		dataIndex: "calves_per_hutch",
		key: "calves_per_hutch",
	},
	{
		title: "Аборты",
		dataIndex: "abortions",
		key: "abortions",
	},
	{
		title: "Падеж молодняка",
		dataIndex: "young_animal_losses",
		key: "young_animal_losses",
	},
	{
		title: "Мертворожденные",
		dataIndex: "stillbirths",
		key: "stillbirths",
	},
	{
		title: "Падеж коров на откормке",
		dataIndex: "losses_during_fattening_of_cows",
		key: "losses_during_fattening_of_cows",
	},
	{
		title: "Падеж коров основного стада",
		dataIndex: "losses_of_main_herd_cows",
		key: "losses_of_main_herd_cows",
	},
	{
		title: "Дата создания",
		dataIndex: "createdAt",
		key: "createdAt",
	},
	// {
	// 	title: "Updated At",
	// 	dataIndex: "updatedAt",
	// 	key: "updatedAt",
	// },
];

const DataViewPage = () => {
	const [rowData, setRowData] = useState([]);
	const [date, setDate] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get("http://localhost:3001/row/getToday", {
				params: { date: "2023-05-08T00:00:00.000Z" },
			});
			setRowData(response.data);
		};
		fetchData();
	}, []);

	const dataSource = [rowData].map((data, index) => ({
		...data,
		key: index,
	}));

	return (
		<div>
			<RangePicker
				style={{ marginBottom: 16 }}
				onChange={(value, dateString) => {
					console.log(dateString);
					const isoDates = dateString.map((date) =>
						new Date(date).toISOString()
					);
					console.log(isoDates);
				}}
			/>

			<Table
				scroll={{ x: 100 }}
				columns={columns}
				dataSource={dataSource}
				key={dataSource.key}
			/>
		</div>
	);
};

export { DataViewPage };

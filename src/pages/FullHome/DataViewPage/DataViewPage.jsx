import { Button, DatePicker, Radio, Table } from "antd";
import axios from "axios";
import dayjs from "dayjs";
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
	const [rowData2, setRowData2] = useState([]);
	const [selectedDataSource, setSelectedDataSource] = useState("all");
	const [startDate, setStartDate] = useState(
		dayjs().startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
	);
	const [endDate, setEndDate] = useState(
		dayjs().add(1, "day").startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
	);

	const columnsFeed = [
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
				<Button onClick={() => handleDelete(record._id)}>Удалить</Button>
			),
		},
	];

	const handleDelete = async (id) => {
		try {
			console.log(id);
			// await axios.delete(`http://localhost:3001/feedAndAddivitives/${id}`);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				"http://localhost:3001/row/getAllByExpression",
				{
					params: {
						date: `${startDate};;${endDate}`,
					},
				}
			);
			setRowData(response.data);
		};

		const fetchDataFeed = async () => {
			const response = await axios.get(
				"http://localhost:3001/feedAndAddivitives/find",
				{}
			);
			setRowData2(response.data[0].feed_and_additives);
		};
		selectedDataSource === "all" ? fetchData() : fetchDataFeed();
	}, [selectedDataSource, startDate, endDate]);

	const handleDataSourceChange = (e) => {
		setSelectedDataSource(e.target.value);
	};

	const transformData = (data) => {
		return data.map((item) => {
			return {
				...item,
				key: item._id,
			};
		});
	};

	return (
		<div>
			<Radio.Group
				onChange={handleDataSourceChange}
				value={selectedDataSource}
				style={{ paddingRight: 25 }}
			>
				<Radio.Button value="all">Просмотр всех данных</Radio.Button>
				<Radio.Button value="feed">Просмотр корма</Radio.Button>
			</Radio.Group>
			<RangePicker
				style={{ marginBottom: 16 }}
				defaultValue={[
					dayjs(startDate).startOf("day"),
					dayjs(endDate).endOf("day"),
				]}
				onChange={(value, dateString) => {
					const isoDates = dateString.map((date) =>
						new Date(date).toISOString()
					);

					setStartDate(isoDates[0]);
					setEndDate(isoDates[1]);
				}}
			/>
			<Table
				scroll={{ x: 100 }}
				columns={selectedDataSource === "all" ? columns : columnsFeed}
				dataSource={
					selectedDataSource === "all"
						? transformData(rowData)
						: transformData(rowData2)
				}
				key={rowData.key}
			/>
		</div>
	);
};

export { DataViewPage };

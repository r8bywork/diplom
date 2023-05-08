import { DatePicker, Table } from "antd";
import React, { useState } from "react";

const { RangePicker } = DatePicker;

const data = [
	{
		key: "1",
		name: "John Brown",
		age: 32,
		address: "New York No. 1 Lake Park",
		date: "2022-05-05",
	},
	{
		key: "2",
		name: "Jim Green",
		age: 42,
		address: "London No. 1 Lake Park",
		date: "2022-05-06",
	},
	{
		key: "3",
		name: "Joe Black",
		age: 32,
		address: "Sidney No. 1 Lake Park",
		date: "2022-05-07",
	},
];

const columns = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Age",
		dataIndex: "age",
		key: "age",
	},
	{
		title: "Address",
		dataIndex: "address",
		key: "address",
	},
	{
		title: "Date",
		dataIndex: "date",
		key: "date",
		sorter: (a, b) => new Date(a.date) - new Date(b.date),
		sortDirections: ["ascend", "descend"],
		filters: [
			{
				text: "Today",
				value: "today",
			},
			{
				text: "This week",
				value: "this_week",
			},
			{
				text: "This month",
				value: "this_month",
			},
		],
		onFilter: (value, record) => {
			const today = new Date();
			const date = new Date(record.date);
			switch (value) {
				case "today":
					return (
						date.getDate() === today.getDate() &&
						date.getMonth() === today.getMonth() &&
						date.getFullYear() === today.getFullYear()
					);
				case "this_week":
					const firstDayOfWeek = new Date(
						today.setDate(today.getDate() - today.getDay())
					);
					return date >= firstDayOfWeek;
				case "this_month":
					const firstDayOfMonth = new Date(
						today.getFullYear(),
						today.getMonth(),
						1
					);
					return date >= firstDayOfMonth;
				default:
					return true;
			}
		},
	},
];

const DataViewPage = () => {
	const [filteredData, setFilteredData] = useState([]);

	const onFilterChange = (filters) => {
		let filteredData = data;
		for (const filterKey in filters) {
			const filterValue = filters[filterKey];
			if (filterValue.length > 0) {
				filteredData = filteredData.filter((record) =>
					filterValue.includes(record[filterKey])
				);
			}
		}
		setFilteredData(filteredData);
	};

	return (
		<div>
			<RangePicker
				style={{ marginBottom: 16 }}
				onChange={(value, dateString) => console.log(dateString)}
			/>
			<Table
				columns={columns}
				dataSource={filteredData.length > 0 ? filteredData : data}
				onChange={(pagination, filters, sorter) => {
					console.log("pagination:", pagination);
					console.log("filters:", filters);
					console.log("sorter:", sorter);
					onFilterChange(filters);
				}}
			/>
		</div>
	);
};

export { DataViewPage };

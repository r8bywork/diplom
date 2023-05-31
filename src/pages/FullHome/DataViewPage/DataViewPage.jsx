import { Button, DatePicker, Input, Modal, Radio, Table, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import ChartComponent from "./charts/ChartComponent";
import ChartComponent2 from "./charts/ChartComponent2";
import ChartComponent3 from "./charts/ChartComponent3";
import { columns, columnsFeed, columnsHouse } from "./mock";
const { RangePicker } = DatePicker;

const DataViewPage = () => {
	const [rowData, setRowData] = useState([]);
	const [rowData2, setRowData2] = useState([]);
	const [houseData, setHouseData] = useState([]);
	const [selectedDataSource, setSelectedDataSource] = useState("all");
	const [startDate, setStartDate] = useState(
		dayjs().startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
	);
	const [endDate, setEndDate] = useState(
		dayjs().add(1, "day").startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
	);

	const [visible, setVisible] = useState(false);
	const [visibleFeed, setVisibleFeed] = useState(false);
	const [selectedHouse, setSelectedHouse] = useState(null);
	const [selectedFeed, setSelectedFeed] = useState(null);
	const [formValues, setFormValues] = useState({});

	const showModal = (record) => {
		setSelectedHouse(record);
		setFormValues({
			name: record.name,
			cowsCount: record.cowsCount,
		});
		console.log(formValues);
		setVisible(true);
	};

	const showModalFeed = (record) => {
		setSelectedFeed(record);
		setFormValues({
			name: record.name,
			balance: record.balance,
			daily_requirement: record.daily_requirement,
		});
		console.log(formValues);
		setVisibleFeed(true);
	};

	const handleCancel = () => {
		setVisible(false);
		setVisibleFeed(false);
		setFormValues({});
	};

	const handleOk = async () => {
		try {
			console.log(formValues);
			console.log(selectedHouse);
			const response = await axios.put(`http://localhost:3001/houses/update`, {
				houseId: selectedHouse._id,
				...formValues,
			});
			response.status === 200
				? message.success("Вы успешно обновили данные!")
				: message.error("Ошибка!");
			setVisible(false);
			setFormValues({});
		} catch (error) {
			console.error(error);
		}
	};

	const handleFeedOk = async () => {
		try {
			console.log(formValues);
			console.log(selectedFeed);
			const response = await axios.put(
				`http://localhost:3001/feedAndAddivitives/change`,
				{
					feed: {
						feedId: selectedFeed._id,
						...formValues,
					},
				}
			);
			response.status === 200
				? message.success("Вы успешно обновили данные!")
				: message.error("Ошибка!");
			setVisibleFeed(false);
			setFormValues({});
		} catch (error) {
			console.error(error);
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
			console.log(response.data);
			setRowData(response.data);
		};

		const fetchDataFeed = async () => {
			const response = await axios.get(
				"http://localhost:3001/feedAndAddivitives/find",
				{}
			);
			console.log(response.data);
			setRowData2(response.data[0].feed_and_additives);
		};

		const fetchHouseData = async () => {
			const response = await axios.get("http://localhost:3001/houses", {});
			setHouseData(response.data[0].houses);
		};

		selectedDataSource === "all"
			? fetchData()
			: selectedDataSource === "feed"
			? fetchDataFeed()
			: selectedDataSource === "house" ?? fetchHouseData();
	}, [selectedDataSource, startDate, endDate, houseData]);

	const handleDataSourceChange = (e) => {
		setSelectedDataSource(e.target.value);
		setVisible(false);
		setFormValues({});
	};

	const transformData = (data) => {
		return data.map((item) => {
			return {
				...item,
				key: item._id,
			};
		});
	};

	const exportToExcel = () => {
		let exportData = [];
		let columnsConfig = [];

		if (selectedDataSource === "all" && rowData) {
			exportData = transformData(rowData);
			columnsConfig = columns;
		} else if (selectedDataSource === "feed" && rowData2) {
			exportData = transformData(rowData2);
			columnsConfig = columnsFeed();
		} else if (selectedDataSource === "house" && houseData) {
			exportData = transformData(houseData);
			columnsConfig = columnsHouse();
		} else {
			console.log("Invalid selected data source or missing data");
			return;
		}
		// Remove the column with key "actions" from the columnsConfig
		const filteredColumnsConfig = columnsConfig.filter(
			(column) => column.key !== "actions"
		);

		// Convert data to worksheet format
		const worksheet = convertToWorksheet(exportData, filteredColumnsConfig);

		// Create a new workbook and add the worksheet
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

		// Convert the workbook to an Excel file
		const excelBuffer = XLSX.write(workbook, {
			bookType: "xlsx",
			type: "array",
		});

		// Create a Blob object with the Excel content
		const blob = new Blob([excelBuffer], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});

		// Save the file using FileSaver.js
		saveAs(blob, "report.xlsx");
	};

	// Function to convert data to worksheet format
	const convertToWorksheet = (data, columnsConfig) => {
		const worksheetData = [];

		// Add the column headers to the worksheet
		const headerRow = columnsConfig.map((column) => column.title);
		worksheetData.push(headerRow);

		// Add the data rows to the worksheet
		data.forEach((item) => {
			const rowData = columnsConfig.map((column) => {
				const dataIndex = column.dataIndex;
				return dataIndex ? item[dataIndex] : "";
			});
			worksheetData.push(rowData);
		});

		// Convert the worksheet data to a worksheet object
		const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

		return worksheet;
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
				<Radio.Button value="house">Просмотр домиков</Radio.Button>
			</Radio.Group>
			{selectedDataSource === "all" && (
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
			)}
			<Table
				scroll={{ x: 100 }}
				columns={
					selectedDataSource === "all"
						? columns
						: selectedDataSource === "feed"
						? columnsFeed(showModalFeed)
						: columnsHouse(showModal)
				}
				dataSource={
					selectedDataSource === "all"
						? transformData(rowData)
						: selectedDataSource === "feed"
						? transformData(rowData2)
						: transformData(houseData)
				}
				key={rowData.key}
			/>

			<Button type="primary" onClick={exportToExcel}>
				Экспорт в Excel
			</Button>

			{selectedDataSource === "all" && rowData.length > 0 && (
				<ChartComponent data={rowData} title={columns} />
			)}

			{selectedDataSource === "feed" && rowData2.length > 0 && (
				<ChartComponent2 data={rowData2} />
			)}

			{selectedDataSource === "house" && houseData.length > 0 && (
				<ChartComponent3 data={houseData} />
			)}

			<Modal
				title="Изменить домик"
				open={visible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<div>
					<label>Наименование домика:</label>
					<Input
						value={formValues.name || ""}
						onChange={(e) =>
							setFormValues({ ...formValues, name: e.target.value })
						}
						style={{ marginBottom: 16 }}
					/>
					<label>Количество голов в домике:</label>
					<Input
						value={formValues.cowsCount || ""}
						onChange={(e) =>
							setFormValues({ ...formValues, cowsCount: e.target.value })
						}
						style={{ marginBottom: 16 }}
					/>
				</div>
			</Modal>
			<Modal
				title="Изменить корм"
				open={visibleFeed}
				onOk={handleFeedOk}
				onCancel={handleCancel}
			>
				<div>
					<label>Наименование корма:</label>
					<Input
						value={formValues.name || ""}
						onChange={(e) =>
							setFormValues({ ...formValues, name: e.target.value })
						}
						style={{ marginBottom: 16 }}
					/>
					<label>Количество:</label>
					<Input
						value={formValues.balance || ""}
						onChange={(e) =>
							setFormValues({ ...formValues, balance: e.target.value })
						}
						style={{ marginBottom: 16 }}
					/>
					<label>Остаток на день:</label>
					<Input
						value={formValues.daily_requirement || ""}
						onChange={(e) =>
							setFormValues({
								...formValues,
								daily_requirement: e.target.value,
							})
						}
						style={{ marginBottom: 16 }}
					/>
				</div>
			</Modal>
		</div>
	);
};

export { DataViewPage };

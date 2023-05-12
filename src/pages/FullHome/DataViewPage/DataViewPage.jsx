import { DatePicker, Input, Modal, Radio, Table, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
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
	const [selectedHouse, setSelectedHouse] = useState(null);
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

	const handleCancel = () => {
		setVisible(false);
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

		const fetchHouseData = async () => {
			const response = await axios.get("http://localhost:3001/houses", {});
			setHouseData(response.data[0].houses);
		};

		selectedDataSource === "all"
			? fetchData()
			: selectedDataSource === "feed"
			? fetchDataFeed()
			: fetchHouseData();
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
				columns={
					selectedDataSource === "all"
						? columns
						: selectedDataSource === "feed"
						? columnsFeed
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
		</div>
	);
};

export { DataViewPage };

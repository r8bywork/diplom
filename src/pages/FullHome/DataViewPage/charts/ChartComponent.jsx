import {
	BarController,
	BarElement,
	CategoryScale,
	Chart,
	LinearScale,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
const ChartComponent = ({ data, title }) => {
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const formattedDate = date.toLocaleDateString("ru-RU", {
			day: "numeric",
			month: "numeric",
			year: "numeric",
		});
		return formattedDate;
	};

	Chart.register(LinearScale);
	Chart.register(BarController, BarElement, CategoryScale);
	const chartData = {
		labels: title.map((item) => item.title),
		datasets: data.map((dataset) => ({
			label: formatDate(dataset.date),
			data: title.map((item) => dataset[item.dataIndex]),
			backgroundColor: getRandomColor(),
		})),
	};
	console.log(chartData, title);

	const chartOptions = {
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
				stacked: false,
			},
		},
	};

	return <Bar data={chartData} options={chartOptions} />;
};

// Вспомогательная функция для генерации случайного цвета
const getRandomColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

export default ChartComponent;

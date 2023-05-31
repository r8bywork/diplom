import React from "react";
import { Bar } from "react-chartjs-2";

const ChartComponent = ({ data, title }) => {
	console.log(data);
	// Извлечь значения из массива объектов
	const labels = Object.keys(data[0]).filter(
		(key) => key !== "_id" && key !== "createdAt" && key !== "updatedAt"
	);
	const datasets = [];

	// Создать набор данных для каждого свойства объекта
	for (let i = 0; i < labels.length; i++) {
		const label = labels[i];
		const values = data.map((item) => item[label]);
		const backgroundColor = getRandomColor(); // Генерировать случайный цвет для каждого набора данных

		datasets.push({
			label: label,
			data: values,
			backgroundColor: backgroundColor,
		});
	}

	// Настройки графика
	const chartData = {
		labels: labels,
		datasets: datasets,
	};

	const chartOptions = {
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
				stacked: true, // Стековая диаграмма, если требуется
			},
		},
	};

	return <Bar data={chartData} options={chartOptions} />;
};

// Вспомогательная функция для генерации случайного цвета
function getRandomColor() {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

export default ChartComponent;

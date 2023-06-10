import {
	BarController,
	BarElement,
	CategoryScale,
	Chart,
	Legend,
	LinearScale,
	Title,
} from "chart.js";
import React, { useEffect, useRef } from "react";

const ChartComponent2 = ({ data }) => {
	const chartRef = useRef(null);
	useEffect(() => {
		Chart.register(
			BarController,
			BarElement,
			CategoryScale,
			LinearScale,
			Legend,
			Title
		);

		const chartCanvas = chartRef.current;

		let chartInstance = null;

		if (chartCanvas) {
			chartInstance = new Chart(chartCanvas, {
				type: "bar",
				data: {
					labels: data.map((item) => item.name),
					datasets: [
						{
							label: "Остаток",
							data: data.map((item) => item.balance),
							backgroundColor: "#8884d8",
						},
						{
							label: "Дневная потребность",
							data: data.map((item) => item.daily_requirement),
							backgroundColor: "#82ca9d",
						},
					],
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							position: "top",
						},
						title: {
							display: true,
							text: "Корм",
						},
					},
				},
			});
		}

		return () => {
			if (chartInstance) {
				chartInstance.destroy();
			}
		};
	}, [data]);

	return <canvas ref={chartRef} />;
};

export { ChartComponent2 };

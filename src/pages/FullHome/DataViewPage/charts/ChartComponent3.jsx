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

const ChartComponent3 = ({ data }) => {
	const chartRef = useRef(null);
	// console.log(data);

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
							label: "Количство голов в домике",
							data: data.map((item) => item.cowsCount),
							backgroundColor: "#8884d8",
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

export { ChartComponent3 };

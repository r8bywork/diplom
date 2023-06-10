import meet from "../../../assets/meet.webp";
import milk_consumption from "../../../assets/milk_consumption.jpeg";
import milk_production from "../../../assets/milk_production.jpeg";
import milk_truck_order from "../../../assets/milk_truck_order.jpeg";
import gross_yield from "../../../assets/releaseMilk.jpg";
import rojd from "../../../assets/rojd.jpeg";
// const fetchData = async () => {
// 	const userId = localStorage.getItem("id");
// 	const response = await axios.get(
// 		`http://localhost:3001/row/getAllByExpression/${userId}`,
// 		{
// 			params: {
// 				startDate: `${startDate}`,
// 				endDate: `${endDate}`,
// 			},
// 		}
// 	);
// 	setRowData(response.data);
// };

export const cards = [
	{
		id: 1,
		title: "Реализация молока",
		image: gross_yield,
		fields: [
			{
				label: "Количество молока",
				key: "milk_production",
				type: "number",
			},
		],
	},
	{
		id: 2,
		title: "Заявка на молоковоз",
		image: milk_truck_order,
		fields: [
			{
				label: "Количество молока",
				key: "milk_truck_order",
				type: "number",
			},
		],
	},
	{
		id: 3,
		title: "Валовый надой",
		image: milk_production,
		fields: [
			{
				label: "Количество надоя за день в литрах",
				key: "gross_yield",
				type: "number",
			},
		],
	},
	{
		id: 4,
		title: "Отелы голов",
		image: rojd,
		fields: [
			{
				label: "Нетеля",
				key: "heifers",
				type: "number",
			},
			{
				label: "Коровы",
				key: "cows",
				type: "number",
			},
		],
	},
	{
		id: 5,
		title: "Кол-во телят на выпойке",
		image: milk_consumption,
		fields: [
			{
				label: "Сколько голов",
				key: "milk_consumption",
				type: "number",
			},
		],
	},
	{
		id: 6,
		title: "Непроизводственное выбытие",
		image: meet,
		fields: [
			{
				label: "Аборты",
				key: "abortions",
				type: "number",
			},
			{
				label: "Падеж молодняка",
				key: "young_animal_losses",
				type: "number",
			},
			{
				label: "Мертворожденные",
				key: "stillbirths",
				type: "number",
			},
			{
				label: "Падеж коров на откормке",
				key: "losses_during_fattening_of_cows",
				type: "number",
			},
			{
				label: "Падеж коров основного стада",
				key: "losses_of_main_herd_cows",
				type: "number",
			},
		],
	},
	// {
	// 	id: 7,
	// 	title: "Кол-во телят в домике",
	// 	image: hutch_number,
	// 	fields: [
	// 		{
	// 			label: "Выберите домик",
	// 			key: "hutch_number",
	// 			type: "select",
	// 			options: [],
	// 		},
	// 		{
	// 			label: "Кол-во телят",
	// 			key: "calves_per_hutch",
	// 			type: "number",
	// 		},
	// 	],
	// },
];

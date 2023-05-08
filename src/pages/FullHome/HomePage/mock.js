export const cards = [
	{
		id: 1,
		title: "Реализация молока",
		// image: "https://picsum.photos/id/1/300/200",
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
		// image: "https://picsum.photos/id/2/300/200",
		fields: [
			{
				label: "Количество машин",
				key: "milk_truck_order",
				type: "number",
			},
		],
	},
	{
		id: 3,
		title: "Валовый надой",
		// image: "https://picsum.photos/id/1/300/200",
		fields: [
			{
				label: "Количество надоя за день",
				key: "gross_yield",
				type: "number",
			},
		],
	},
	{
		id: 4,
		title: "Отелы голов",
		// image: "https://picsum.photos/id/1/300/200",
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
		// image: "https://picsum.photos/id/1/300/200",
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
		// image: "https://picsum.photos/id/1/300/200",
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
	{
		id: 7,
		title: "Кол-во телят в домике",
		// image: "https://picsum.photos/id/1/300/200",
		fields: [
			{
				label: "Выберите домик",
				key: "hutch_number",
				type: "select",
				options: [
					{ label: "Домик 1", value: "1" },
					{ label: "Домик 2", value: "2" },
					{ label: "Домик 3", value: "3" },
				],
			},
			{
				label: "Кол-во телят",
				key: "calves_per_hutch",
				type: "number",
			},
		],
	},
];

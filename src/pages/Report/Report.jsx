import { Button } from "antd";
import { saveAs } from "file-saver";
import React from "react";
import * as XLSX from "xlsx";

const Report = ({ columns }) => {
	const data = [
		{
			_id: {
				$oid: "645cb06a94d851b6a7ed4034",
			},
			milk_production: 117,
			milk_truck_order: 20,
			gross_yield: 555,
			milk_consumption: 225,
			heifers: 23,
			cows: 1,
			hutch_number: 0,
			calves_per_hutch: 0,
			abortions: 339,
			young_animal_losses: 333,
			stillbirths: 332,
			losses_during_fattening_of_cows: 331,
			losses_of_main_herd_cows: 330,
			createdAt: {
				$date: {
					$numberLong: "1683806874876",
				},
			},
			updatedAt: {
				$date: {
					$numberLong: "1683831947710",
				},
			},
			__v: 0,
		},
	];
	const exportToExcel = () => {
		const worksheet = XLSX.utils.json_to_sheet(data);
		const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
		const excelBuffer = XLSX.write(workbook, {
			bookType: "xlsx",
			type: "array",
		});
		const dataBlob = new Blob([excelBuffer], {
			type: "application/octet-stream",
		});
		saveAs(dataBlob, "report.xlsx");
	};

	return (
		<div>
			<Button type="primary" onClick={exportToExcel}>
				Сохранить
			</Button>
		</div>
	);
};

// Rest of the code remains the same

export { Report };

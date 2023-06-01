import { Button, Form, Input, Steps } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegPage.css";
const { Step } = Steps;

const RegPage = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [companyName, setCompanyName] = useState("");
	const navigate = useNavigate();

	const handleSubmit = () => {
		// const userData = { login, password, email, companyName };
		// console.log(userData);
		navigate("/home");
	};

	const handleLoginChange = (event) => {
		setLogin(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleCompanyNameChange = (event) => {
		setCompanyName(event.target.value);
	};

	const handleNextStep = () => {
		if (
			(login !== "" && password !== "") ||
			(email !== "" && companyName !== "")
		) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrevStep = () => {
		setCurrentStep(currentStep - 1);
	};

	const renderStepContent = (step) => {
		switch (step) {
			case 0:
				return (
					<Form>
						<Form.Item
							label="Логин"
							name="login"
							rules={[
								{
									required: true,
									message: "Пожалуйста, заполните это поле!",
								},
							]}
						>
							<Input value={login} onChange={handleLoginChange} required />
						</Form.Item>
						<Form.Item
							label="Пароль"
							name="password"
							rules={[
								{
									required: true,
									message: "Пожалуйста, заполните это поле!",
								},
							]}
						>
							<Input.Password
								value={password}
								onChange={handlePasswordChange}
								required
							/>
						</Form.Item>
					</Form>
				);
			case 1:
				return (
					<Form>
						<Form.Item label="Почта">
							<Form.Item
								name="email"
								rules={[
									{
										type: "email",
										message: "Введите корректный email-адрес",
									},
									{
										required: true,
										message: "Введите ваш email",
									},
								]}
								hasFeedback
							>
								<Input value={email} onChange={handleEmailChange} />
							</Form.Item>
						</Form.Item>
						<Form.Item
							label="Наименование предприятия"
							name="companyName"
							rules={[
								{
									required: true,
									message: "Пожалуйста, заполните это поле!",
								},
							]}
						>
							<Input
								value={companyName}
								onChange={handleCompanyNameChange}
								required
							/>
						</Form.Item>
					</Form>
				);
			default:
				return null;
		}
	};

	return (
		<div>
			<Steps current={currentStep}>
				<Step title="Логин и пароль" />
				<Step title="Почта и наименование предприятия" />
			</Steps>
			<div className="steps-content inputs">
				{renderStepContent(currentStep)}
			</div>
			<div className="steps-action inputs">
				{currentStep > 0 && (
					<Button style={{ margin: "0 8px" }} onClick={handlePrevStep}>
						Назад
					</Button>
				)}
				{currentStep < 1 && (
					<Button type="primary" onClick={handleNextStep}>
						Далее
					</Button>
				)}
				{currentStep === 1 && (
					<Button type="primary" onClick={handleSubmit}>
						Зарегистрироваться
					</Button>
				)}
			</div>
		</div>
	);
};

export { RegPage };

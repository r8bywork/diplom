import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AddFeedPage } from "./pages/AddFeedPage/AddFeedPage";
import { FullHome } from "./pages/FullHome/FullHome";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegistrationForm } from "./pages/RegistrationForm/RegistrationForm";
import { Report } from "./pages/Report/Report";
import { SettingsPage } from "./pages/SettingsPage/SettingsPage";

const App = () => {
	return (
		<div className="appContainer">
			<Router>
				<Routes>
					<Route path="/" element={<FullHome />} />
					<Route path="/registration" element={<RegistrationForm />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/feed" element={<AddFeedPage />} />
					<Route path="/settings" element={<SettingsPage />} />
					<Route path="/report" element={<Report />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;

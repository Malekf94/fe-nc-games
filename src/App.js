import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Categories from "./pages/Categories";
import Reviews from "./pages/Reviews";
import ReviewById from "./pages/ReviewById";
import Users from "./pages/Users";
import UserById from "./pages/UserById";
import NavBar from "./pages/NavBar";
import { CategoriesContext } from "./contexts/CatergoriesContext.jsx";
import { useState } from "react";
import TopBar from "./pages/TopBar";
import { LoggedInUserContext } from "./contexts/LoggedInUserContext";

function App() {
	const [categories, setCategories] = useState([]);
	const [loggedInUser, setLoggedInUser] = useState({
		username: "grumpy19",
		name: "Paul Grump",
		avatar_url:
			"https://vignette.wikia.nocookie.net/mrmen/images/7%E2%80%A6r-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
	});
	return (
		<LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
			<CategoriesContext.Provider value={{ categories, setCategories }}>
				<div className="App">
					<BrowserRouter>
						<TopBar />
						<NavBar />
						<div className="main_body">
							<Routes>
								<Route path="/" element={<HomePage />} />
								<Route path="/categories" element={<Categories />} />
								<Route path="/reviews" element={<Reviews />} />
								<Route path="/reviews/:review_id" element={<ReviewById />} />
								<Route path="/users" element={<Users />} />
								<Route path="/users/:username" element={<UserById />} />
							</Routes>
						</div>
					</BrowserRouter>
				</div>
			</CategoriesContext.Provider>
		</LoggedInUserContext.Provider>
	);
}

export default App;

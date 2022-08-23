import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
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

function App() {
	const [categories, setCategories] = useState([]);
	return (
		<CategoriesContext.Provider value={{ categories, setCategories }}>
			<div className="App">
				<BrowserRouter>
					<header className="App-header">
						<Link className="NavBarLinks" to="/">
							Welcome to the NC Games{" "}
						</Link>
					</header>
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
	);
}

export default App;

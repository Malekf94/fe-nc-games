import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Categories from "./pages/Categories";
import Reviews from "./pages/Reviews";
import ReviewById from "./pages/ReviewById";
import Users from "./pages/Users";
import UserById from "./pages/UserById";
import NavBar from "./pages/NavBar";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<header className="App-header">
					<h1>Welcome to the NC Games</h1>
					<NavBar />
				</header>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/categories" element={<Categories />} />
					<Route path="/reviews" element={<Reviews />} />
					<Route path="/review/:review_id" element={<ReviewById />} />
					<Route path="/users" element={<Users />} />
					<Route path="/users/:username" element={<UserById />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

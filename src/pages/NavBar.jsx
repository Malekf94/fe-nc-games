import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
	return (
		<div className="NavBarC">
			<Link to="/reviews">Reviews </Link>
			<Link to="categories">Categories</Link>
			<Link to="/users">Users </Link>
		</div>
	);
}

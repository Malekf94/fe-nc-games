import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
	return (
		<div className="NavBarC">
			<Link className="NavBarLinks" to="/reviews">
				Reviews{" "}
			</Link>
			<Link className="NavBarLinks" to="/categories">
				Categories{" "}
			</Link>
			<Link className="NavBarLinks" to="/users">
				Users{" "}
			</Link>
		</div>
	);
}

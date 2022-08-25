import React from "react";
import { Link } from "react-router-dom";
import styles from "../cssPages/NavBar.module.css";

export default function NavBar() {
	return (
		<div className={styles.NavBarC}>
			<Link to="/">HomePage </Link>
			<Link to="/reviews">Reviews </Link>
			<Link to="categories">Categories</Link>
			<Link to="/users">Users </Link>
		</div>
	);
}

import { useEffect, useState } from "react";
import { getCategories } from "../api";
// import styles from "../pages/cssPages/Reviews.module.css";

export default function GetReviews() {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		getCategories().then((data) => {
			setCategories(data.catergories);
		});
	}, []);
}

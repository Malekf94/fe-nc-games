import React from "react";
import GetReviews from "../components/GetReviews";
import styles from "../cssPages/Reviews.module.css";

export default function Reviews() {
	return (
		<div className={styles.body}>
			<h1>Reviews</h1>
			<GetReviews />
		</div>
	);
}

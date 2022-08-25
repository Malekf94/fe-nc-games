import React, { useContext, useEffect, useState } from "react";
import { getCategories, getReviews } from "../api";
import { CategoriesContext } from "../contexts/CatergoriesContext";
import { useNavigate } from "react-router-dom";
import styles from "../cssPages/Reviews.module.css";

export default function GetReviews() {
	const [reviews, setReviews] = useState([]);
	const [queries, setQueries] = useState([]);
	const [catQuery, setCatQuery] = useState("");
	// const [sortQuery, setSortQuery] = useState("");
	// const [orderQuery, setOrderQuery] = useState("");
	const [isShown, setIsShown] = useState("hidden");
	const navigate = useNavigate();
	const { categories, setCategories } = useContext(CategoriesContext);
	useEffect(() => {
		getCategories().then((data) => {
			setCategories(data.categories);
		});
	}, []);

	useEffect(() => {
		getReviews(queries).then((data) => {
			setReviews(data.reviews);
		});
	}, [queries]);

	useEffect(() => {
		let queryLine = "?";
		if (catQuery !== "") {
			queryLine += `category=${catQuery}`;
		}
		setQueries(queryLine);
		navigate(`/reviews${queryLine}`);
	}, [catQuery]);

	return (
		<div className={styles.body}>
			<section>
				<button
					className={styles.sortButton}
					onClick={() => {
						isShown === "hidden" ? setIsShown("") : setIsShown("hidden");
					}}
				>
					Category
				</button>
				<ul className={isShown}>
					{categories.map((category) => {
						return (
							<button
								onClick={() => setCatQuery(category.slug)}
								// className="individual_Review"
								key={category.slug}
							>
								{category.slug}
							</button>
						);
					})}
				</ul>
			</section>
			<button className={styles.sortButton}>Sort by</button>
			<button className={styles.sortButton}>Order By</button>
			<ul>
				{reviews.map((review) => {
					return (
						<li
							onClick={() => navigate(`/reviews/${review.review_id}`)}
							className={styles.individual_Review}
							key={review.review_id}
						>
							<p>Title: {review.title}</p>
							<p>The Review: {review.review_body}</p>
							<img
								className={styles.review_img}
								src={review.review_img_url}
								alt={review.title}
							/>
							<p>Category: {review.category}</p>
							<p>Author: {review.owner}</p>
							<p>Designer: {review.designer}</p>
							{/* <p>{review.created_at}</p> */}
							<p>Number of votes: {review.votes}</p>
							<p>Comments: {review.comment_count}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

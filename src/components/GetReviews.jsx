import React, { useContext, useEffect, useState } from "react";
import { getCategories, getReviews } from "../api";
import { CategoriesContext } from "../contexts/CatergoriesContext";
import { useNavigate } from "react-router-dom";
import styles from "../cssPages/Reviews.module.css";

export default function GetReviews() {
	const [reviews, setReviews] = useState([]);
	const [queries, setQueries] = useState([]);
	const [catQuery, setCatQuery] = useState("");
	const [sortQuery, setSortQuery] = useState("");
	const [orderQuery, setOrderQuery] = useState("");
	const [isShown, setIsShown] = useState(styles.hidden);
	const navigate = useNavigate();
	const { categories, setCategories } = useContext(CategoriesContext);

	useEffect(() => {
		getCategories().then((data) => {
			setCategories(data.categories);
		});
	}, []);
	const sortables = ["date", "comment count", "votes"];
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
		if (sortQuery !== "" && catQuery === "") {
			queryLine += `sort_by=${sortQuery}`;
		} else if (sortQuery !== "" && catQuery !== "") {
			queryLine += `&&sort_by=${sortQuery}`;
		}
		if (orderQuery !== "" && queryLine !== "?") {
			queryLine += `&&order=${orderQuery}`;
		} else if (sortQuery !== "" && queryLine == "?") {
			queryLine += `sort_by=${sortQuery}`;
		}

		setQueries(queryLine);
		navigate(`/reviews${queryLine}`);
	}, [catQuery, sortQuery, orderQuery]);

	const sortingSetter = (sortable) => {
		if (sortable === "date") {
			setSortQuery("created_at");
		} else if (sortable === "comment count") {
			setSortQuery("comment_count");
		} else if (sortable === "votes") {
			setSortQuery("votes");
		} else {
			setSortQuery("");
		}
	};

	const resetFilters = () => {
		setCatQuery("");
		setOrderQuery("");
		setSortQuery("");
	};
	return (
		<div className={styles.body}>
			<section>
				<h3>Click on filters to preview options:</h3>
				<button
					className={styles.sortButton}
					onClick={() => {
						isShown === styles.hidden
							? setIsShown("")
							: setIsShown(styles.hidden);
					}}
				>
					Category
				</button>
				<ul className={isShown}>
					{categories.map((category) => {
						return (
							<button
								onClick={() => setCatQuery(category.slug)}
								key={category.slug}
							>
								{category.slug}
							</button>
						);
					})}
				</ul>
				<button
					className={styles.sortButton}
					onClick={() => {
						isShown === styles.hidden
							? setIsShown("")
							: setIsShown(styles.hidden);
					}}
				>
					Sort by
				</button>
				<ul className={isShown}>
					{sortables.map((sortable) => {
						return (
							<button onClick={() => sortingSetter(sortable)} key={sortable}>
								{sortable}
							</button>
						);
					})}
				</ul>
				<button
					className={styles.sortButton}
					onClick={() => {
						orderQuery === "" ? setOrderQuery("asc") : setOrderQuery("");
					}}
				>
					Order By
				</button>
				<button onClick={() => resetFilters()}>Reset Filters</button>
			</section>
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

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
	}, [setCategories]);
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
		} else if (sortQuery !== "" && queryLine === "?") {
			queryLine += `sort_by=${sortQuery}`;
		}

		setQueries(queryLine);
		navigate(`/reviews${queryLine}`);
	}, [catQuery, sortQuery, orderQuery, navigate]);

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
								className={styles.sorteeButtons}
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
							<button
								className={styles.sorteeButtons}
								onClick={() => sortingSetter(sortable)}
								key={sortable}
							>
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
							<h3>Title: </h3>
							<section className="p">{review.title}</section>
							<h3>The Review: </h3>
							<section className="p">{review.review_body}</section>
							<img
								className={styles.review_img}
								src={review.review_img_url}
								alt={review.title}
							/>
							<h3>Category:</h3>{" "}
							<section className="p">{review.category}</section>
							<h3>Author: </h3>
							<section className="p">{review.owner}</section>
							<h3>Designer: </h3>
							<section className="p">{review.designer}</section>
							{/* <h3>{review.created_at}</h3> */}
							<h3>Number of votes: </h3>
							<section className="p">{review.votes}</section>
							<h3>Comments: </h3>
							<section className="p">{review.comment_count}</section>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

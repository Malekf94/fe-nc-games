import React, { useContext, useEffect, useState } from "react";
import { getReviews } from "../api";
import { CategoriesContext } from "../contexts/CatergoriesContext";
// import styles from "../pages/cssPages/Reviews.module.css";
import { useNavigate } from "react-router-dom";

export default function GetReviews() {
	const [reviews, setReviews] = useState([]);
	const [queries, setQueries] = useState([]);
	const { categories } = useContext(CategoriesContext);
	const [catQuery, setCatQuery] = useState("");
	// const [sortQuery, setSortQuery] = useState("");
	// const [orderQuery, setOrderQuery] = useState("");
	const [isShown, setIsShown] = useState("hidden");
	const navigate = useNavigate();

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
		<div className="body">
			<section>
				<button
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
			<button>Sort by</button>
			<button>Order By</button>
			<ul>
				{reviews.map((review) => {
					return (
						<li
							onClick={() => navigate(`/reviews/${review.review_id}`)}
							className="individual_Review"
							key={review.review_id}
						>
							<p>Title: {review.title}</p>
							<p>The Review: {review.review_body}</p>
							<img
								className="review_img"
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

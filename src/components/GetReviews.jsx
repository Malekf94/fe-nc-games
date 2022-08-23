import React, { useEffect, useState } from "react";
import { getReviews } from "../api";
import styles from "../pages/cssPages/Reviews.module.css";

export default function GetReviews() {
	const [reviews, setReviews] = useState([]);
	useEffect(() => {
		getReviews().then((data) => {
			setReviews(data.reviews);
		});
	}, []);

	return (
		<div className="body">
			<ul>
				{reviews.map((review) => {
					return (
						<li className="individual_Review" key={review.review_id}>
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

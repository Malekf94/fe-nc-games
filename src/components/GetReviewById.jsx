import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewById } from "../api";

export default function GetReviewById() {
	const { review_id } = useParams();
	const [review, setReview] = useState("");

	useEffect(() => {
		getReviewById(review_id).then((data) => {
			setReview(data.review);
		});
	}, []);

	return (
		<div className="body">
			<ul>
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
					{<p>{review.created_at}</p>}
					<p>Number of votes: {review.votes}</p>
					<p>Comments: {review.comment_count}</p>
				</li>
			</ul>
		</div>
	);
}

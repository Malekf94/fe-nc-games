import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewById, patchReviewById } from "../api";

export default function GetReviewById() {
	const { review_id } = useParams();
	const [review, setReview] = useState("");
	const [votes, setVotes] = useState("");

	useEffect(() => {
		getReviewById(review_id).then((data) => {
			setReview(data.review);
			setVotes(data.review.votes);
		});
	}, []);

	const incrementVote = () => {
		patchReviewById(review_id, {
			inc_votes: 1,
		}).then((updatedVote) => {});
		setVotes(votes + 1);
	};

	const decreaseVote = () => {
		patchReviewById(review_id, {
			inc_votes: -1,
		}).then((updatedVote) => {});
		setVotes(votes - 1);
	};

	// useEffect(() => {}, [votes]);

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
					<section>
						<button onClick={() => incrementVote()}>UpVote</button>
						Number of votes: {votes}
						<button onClick={() => decreaseVote()}>Downvote</button>
					</section>
					<p>Comments: {review.comment_count}</p>
				</li>
			</ul>
		</div>
	);
}

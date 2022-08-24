import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsById, getReviewById, patchReviewById } from "../api";

export default function GetReviewById() {
	const { review_id } = useParams();
	const [review, setReview] = useState("");
	const [votes, setVotes] = useState("");
	const [comments, setComments] = useState([]);
	const [isShown, setIsShown] = useState(["hidden", "Show Comments"]);

	useEffect(() => {
		getReviewById(review_id)
			.then((data) => {
				setReview(data.review);
				setVotes(data.review.votes);
			})
			.then(() => {
				getCommentsById(review_id).then((data) => {
					if (data.msg === "No comment related") {
					} else {
						setComments(data.comments);
					}
				});
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
			<button
				onClick={() => {
					isShown[0] === "hidden"
						? setIsShown(["show", "Scroll down to see comments"])
						: setIsShown(["hidden", "Show Comments"]);
				}}
			>
				{isShown[1]}
			</button>
			<ul className={isShown[0]}>
				{comments.map((comment) => {
					return (
						<li className="individual_Review" key={comment.comment_id}>
							<p>Author: {comment.author}</p>
							<p>Comment: {comment.body}</p>
							<p>Posted at : {comment.created_at}</p>
							<p>Number of Votes: {comment.votes}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

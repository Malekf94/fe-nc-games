import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	addCommentById,
	getCommentsById,
	getReviewById,
	patchReviewById,
} from "../api";
import { LoggedInUserContext } from "../contexts/LoggedInUserContext";
import styles from "../cssPages/Reviews.module.css";

export default function GetReviewById() {
	const { loggedInUser } = useContext(LoggedInUserContext);
	const { review_id } = useParams();
	const [review, setReview] = useState("");
	const [votes, setVotes] = useState("");
	const [comments, setComments] = useState([]);
	const [isShown, setIsShown] = useState([styles.hidden, "Show Comments"]);
	const [inputBody, setInputBody] = useState("");

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
	}, [comments]);

	const incrementVote = () => {
		patchReviewById(review_id, {
			inc_votes: 1,
		}).then(() => {});
		setVotes(votes + 1);
	};

	const decreaseVote = () => {
		patchReviewById(review_id, {
			inc_votes: -1,
		}).then(() => {});
		setVotes(votes - 1);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const inputtedComment = {
			username: loggedInUser.username,
			body: inputBody,
		};
		addCommentById(review_id, inputtedComment).then((data) => {
			setComments([...comments, data.comment]);
			setInputBody("");
		});
	};

	return (
		<div className={styles.body}>
			<h1>View the review below for {review.title}</h1>
			<ul>
				<li className={styles.individual_Review} key={review.review_id}>
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
					isShown[0] === styles.hidden
						? setIsShown([styles.show, "Scroll down to see comments"])
						: setIsShown([styles.hidden, "Show Comments"]);
				}}
			>
				{isShown[1]}
			</button>
			<ul className={isShown[0]}>
				{comments.map((comment) => {
					return (
						<li className={styles.individual_Review} key={comment.comment_id}>
							<p>Author: {comment.author}</p>
							<p>Comment: {comment.body}</p>
							<p>Posted at : {comment.created_at}</p>
							<p>Number of Votes: {comment.votes}</p>
						</li>
					);
				})}
				<form onSubmit={(e) => handleSubmit(e)}>
					<textarea
						onChange={(e) => {
							setInputBody(e.target.value);
						}}
						value={inputBody}
						cols="100"
						rows="10"
						placeholder="Type Comment Here"
						name="newComment"
					></textarea>
					<input name="Submit Comment" value="Submit Comment" type="submit" />
				</form>
			</ul>
		</div>
	);
}

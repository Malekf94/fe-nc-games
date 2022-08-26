import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	addCommentById,
	deleteCommentById,
	getCommentsById,
	getReviewById,
	patchReviewById,
} from "../api";
import { LoggedInUserContext } from "../contexts/LoggedInUserContext";
import styles from "../cssPages/Reviews.module.css";
import ErrorPage from "../pages/ErrorPage";

export default function GetReviewById() {
	const { loggedInUser } = useContext(LoggedInUserContext);
	const { review_id } = useParams();
	const [review, setReview] = useState("");
	const [votes, setVotes] = useState("");
	const [numOfComments, setNumOfComments] = useState(0);
	const [comments, setComments] = useState([]);
	const [isShown, setIsShown] = useState([styles.hidden, "Show Comments"]);
	const [inputBody, setInputBody] = useState("");
	const [disabledButton, setDisabledButton] = useState(false);
	const [deleteButtonText, setDeleteButtonText] = useState("Delete");
	const navigate = useNavigate();
	const [error, setError] = useState(null);

	useEffect(() => {
		getReviewById(review_id)
			.then((data) => {
				setReview(data.review);
				setVotes(data.review.votes);
			})
			.catch((err) => {
				if (err.response.status === 404) {
					setError(err.response.data.msg);
				} else {
					setError("Something has gone wrong...");
				}
			});
	}, []);

	useEffect(() => {
		getCommentsById(review_id)
			.then((commentData) => {
				if (commentData.msg === "No comment related") {
					setComments([]);
				} else {
					setComments(commentData.comments);
				}
				setNumOfComments(comments.length);
			})
			.catch((err) => {
				if (err.response.status === 404) {
					setError(err.response.data.msg);
				} else {
					setError("Something has gone wrong...");
				}
			});
	}, []);

	const changeVote = (vote) => {
		patchReviewById(review_id, {
			inc_votes: vote,
		}).then(() => {});
		setVotes(votes + vote);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const inputtedComment = {
			username: loggedInUser.username,
			body: inputBody,
		};
		addCommentById(review_id, inputtedComment)
			.then((data) => {
				setComments([...comments, data.comment]);
				setNumOfComments(numOfComments + 1);
				setInputBody("");
			})
			.catch((err) => {
				if (err.response.status === 400) {
					setError(err.response.data.msg);
				} else {
					setError("Something has gone wrong...");
				}
			});
	};

	const deleteComment = (comment) => {
		setDisabledButton(true);
		if (comment.author === loggedInUser.username) {
			deleteCommentById(comment.comment_id).then(() => {
				setComments((currComment) => {
					return currComment.filter((newComment) => {
						return newComment.comment_id !== comment.comment_id;
					});
				});
				setNumOfComments(numOfComments - 1);
				setDisabledButton(false);
			});
		} else {
			setDeleteButtonText("You can only delete your own comments");
			setTimeout(function () {
				setTimeout(function () {
					setDeleteButtonText("Delete");
				}, 100);
				setDisabledButton(false);
			}, 1000);
		}
	};

	return (
		<div className={styles.body}>
			{!!error ? (
				// <p>{error}</p>
				<ErrorPage prop={error} />
			) : (
				<div>
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
							<p>Posted at: {review.created_at}</p>
							<section>
								<button onClick={() => changeVote(1)}>UpVote</button>
								Number of votes: {votes}
								<button onClick={() => changeVote(-1)}>Downvote</button>
							</section>
							<p>Comments: {review.comment_count + numOfComments}</p>
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
								<li
									className={styles.individual_Review}
									key={comment.comment_id}
								>
									<p>Author: {comment.author}</p>
									<p>Comment: {comment.body}</p>
									<p>Posted at : {comment.created_at}</p>
									<p>Number of Votes: {comment.votes}</p>
									<button
										disabled={disabledButton}
										onClick={() => {
											deleteComment(comment);
										}}
									>
										{deleteButtonText}
									</button>
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
							<input
								name="Submit Comment"
								value="Submit Comment"
								type="submit"
							/>
						</form>
					</ul>
				</div>
			)}
		</div>
	);
}

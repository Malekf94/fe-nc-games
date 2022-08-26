import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../api";
import { LoggedInUserContext } from "../contexts/LoggedInUserContext";
import styles from "../cssPages/UserCard.module.css";
import ErrorPage from "../pages/ErrorPage";

export default function UserCard({ userbyname }) {
	const { username } = useParams();
	const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
	const navigate = useNavigate();
	const [user, setUser] = useState([]);
	const [error, setError] = useState(null);
	console.log(username);
	console.log(typeof userbyname);

	useEffect(() => {
		if (userbyname !== undefined && typeof userbyname !== "string") {
			getUser(userbyname.username)
				.then(({ userData }) => {
					setUser(userData);
				})
				.catch((err) => {
					if (err.response.status === 404) {
						setError(err.response.data.msg);
					} else {
						setError("Something has gone wrong...");
					}
				});
		} else {
			console.log("yo");
			getUser(username)
				.then(({ userData }) => {
					setUser(userData);
				})
				.catch((err) => {
					if (err.response.status === 404) {
						setError(err.response.data.msg);
					} else {
						setError("Something has gone wrong...");
					}
				});
		}
	}, [username, userbyname]);
	return (
		<section>
			{!!error ? (
				// <p>{error}</p>
				<ErrorPage prop={error} />
			) : (
				<div className={styles.userCard} key={user.username}>
					<p>UserName: {user.username}</p>
					<p>Name: {user.name}</p>
					<img
						onClick={() => {
							setLoggedInUser(user);
							navigate(`/users/${user.username}`);
						}}
						className={styles.userAvatar}
						src={user.avatar_url}
						alt={user.username}
					/>
				</div>
			)}
		</section>
	);
}

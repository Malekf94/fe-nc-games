import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../api";
import { LoggedInUserContext } from "../contexts/LoggedInUserContext";
import styles from "../cssPages/UserCard.module.css";
import ErrorPage from "../pages/ErrorPage";

export default function UserCard({ userbyname }) {
	const { username } = useParams();
	const { setLoggedInUser } = useContext(LoggedInUserContext);
	const navigate = useNavigate();
	const [user, setUser] = useState([]);
	const [error, setError] = useState(null);

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
				// <h3>{error}</h3>
				<ErrorPage prop={error} />
			) : (
				<div className={styles.userCard} key={user.username}>
					<h3>UserName:</h3> <p>{user.username}</p>
					<h3>Name:</h3> <p>{user.name}</p>
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

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../contexts/LoggedInUserContext";
import styles from "../cssPages/UserCard.module.css";

export default function UserCard({ user }) {
	const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
	const navigate = useNavigate();
	return (
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
	);
}

import { useContext, useEffect, useState } from "react";
import { LoggedInUserContext } from "../contexts/LoggedInUserContext";
import styles from "../cssPages/TopBar.module.css";

export default function TopBar() {
	const { loggedInUser } = useContext(LoggedInUserContext);
	const [logInStatement, setLogInStatement] = useState(
		"Please Log in to a user"
	);

	useEffect(() => {
		setLogInStatement(`You are Logged in as ${loggedInUser.username}`);
	}, [loggedInUser]);

	return (
		<header className="App-header">
			<h1 className={styles.topHeader}>Welcome to the NC Games</h1>
			<h5 className={styles.topBarLogIn}>{logInStatement}</h5>
		</header>
	);
}

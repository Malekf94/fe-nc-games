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
			<a className={styles.topHeader} href="/">
				Welcome to the NC Games
			</a>
			<div className={styles.topBarLogIn}>{logInStatement}</div>
		</header>
	);
}

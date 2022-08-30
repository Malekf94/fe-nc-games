import React, { useContext } from "react";
import { LoggedInUserContext } from "../contexts/LoggedInUserContext";

export default function HomePage() {
	const { loggedInUser } = useContext(LoggedInUserContext);
	return (
		<div>
			<h1>Home page</h1>
			<h3>You are logged in as {loggedInUser.username}</h3>
			<h3>
				Feel free to use the links on the navigation bar on the left hand side
				of the screen to navigate through the website!!!
			</h3>
		</div>
	);
}

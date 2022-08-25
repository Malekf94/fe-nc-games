import { useContext } from "react";
import UserCard from "../components/UserCard";
import { LoggedInUserContext } from "../contexts/LoggedInUserContext";

export default function UserById() {
	const { loggedInUser } = useContext(LoggedInUserContext);
	console.log(loggedInUser);
	return <UserCard user={loggedInUser} />;
}

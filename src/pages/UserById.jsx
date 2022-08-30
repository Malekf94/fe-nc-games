// import { useContext } from "react";
import { useParams } from "react-router-dom";
import UserCard from "../components/UserCard";
// import { LoggedInUserContext } from "../contexts/LoggedInUserContext";

export default function UserById() {
	const { username } = useParams();
	return (
		<section>
			{username}'s userCard
			<UserCard userbyname={username} />
		</section>
	);
}

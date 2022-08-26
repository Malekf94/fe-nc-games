// import { useContext } from "react";
import { useParams } from "react-router-dom";
import UserCard from "../components/UserCard";
// import { LoggedInUserContext } from "../contexts/LoggedInUserContext";

export default function UserById() {
	const { username } = useParams();
	return <UserCard userbyname={username} />;
}

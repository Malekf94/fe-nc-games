import { useEffect, useState } from "react";
import { getUsers } from "../api";
import UserCard from "./UserCard";

export default function GetUsers() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers().then((data) => {
			setUsers(data.users);
		});
	}, []);
	return (
		<ul>
			{users.map((user) => {
				return (
					<li key={user.username}>
						<UserCard userbyname={user} />
					</li>
				);
			})}
		</ul>
	);
}

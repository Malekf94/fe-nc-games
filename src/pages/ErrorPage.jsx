import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage({ prop = "invalid page" }) {
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		setError(prop);
	}, []);
	// console.log(prop);

	return (
		<div>
			<h1>ERROR!!!</h1>
			<h3>{error}</h3>
			<button
				onClick={() => {
					navigate(-1);
				}}
			>
				Go back to previous page
			</button>
		</div>
	);
}

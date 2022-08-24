import { useParams } from "react-router-dom";
import GetReviewById from "../components/GetReviewById.jsx";

export default function ReviewById() {
	const { review_id } = useParams();
	return (
		<div>
			<h1>View the review below</h1>
			<GetReviewById />
		</div>
	);
}

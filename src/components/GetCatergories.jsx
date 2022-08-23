import { useContext, useEffect } from "react";
import { getCategories } from "../api";
import { CategoriesContext } from "../contexts/CatergoriesContext";
// import styles from "../pages/cssPages/Reviews.module.css";

export default function GetCategories() {
	const { categories, setCategories } = useContext(CategoriesContext);
	useEffect(() => {
		getCategories().then((data) => {
			setCategories(data.categories);
		});
	}, []);

	return (
		<div>
			<ul>
				{categories.map((category) => {
					return (
						<li className="individual_Review" key={category.slug}>
							<p>Category name : {category.slug}</p>
							<p>Category Description : {category.description}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

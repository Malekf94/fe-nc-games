import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../api";
import { CategoriesContext } from "../contexts/CatergoriesContext";
import styles from "../cssPages/GetCategories.module.css";

export default function GetCategories() {
	const { categories, setCategories } = useContext(CategoriesContext);
	useEffect(() => {
		getCategories().then((data) => {
			setCategories(data.categories);
		});
	}, []);

	const navigate = useNavigate();

	return (
		<div>
			<ul>
				{categories.map((category) => {
					return (
						<li
							onClick={() => navigate(`/reviews?category=${category.slug}`)}
							className={styles.individual_Review}
							key={category.slug}
						>
							<p>Category name : {category.slug}</p>

							<p>Category Description : {category.description}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

import React, { useContext, useEffect } from "react";
import { CategoriesContext } from "../contexts/CatergoriesContext";
import { getCategories } from "../api";

export default function HomePage() {
	const { setCategories } = useContext(CategoriesContext);
	useEffect(() => {
		getCategories().then((data) => {
			setCategories(data.categories);
		});
	}, []);
	return (
		<div>
			<h1>Random Home page</h1>
			<p>I'll put a proper welcome here next time...</p>
		</div>
	);
}

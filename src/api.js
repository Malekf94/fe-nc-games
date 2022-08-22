exports.getReviews = () => {
	return fetch("https://my-games-project.herokuapp.com/api/reviews").then(
		(data) => {
			return data.json();
		}
	);
};

exports.getCategories = () => {
	return fetch("https://my-games-project.herokuapp.com/api/categories").then(
		(data) => {
			return data.json();
		}
	);
};

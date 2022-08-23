exports.getReviews = (queries) => {
	return fetch(
		`https://my-games-project.herokuapp.com/api/reviews${queries}`
	).then((data) => {
		return data.json();
	});
};

exports.getCategories = () => {
	return fetch("https://my-games-project.herokuapp.com/api/categories").then(
		(data) => {
			return data.json();
		}
	);
};

exports.getReviewById = (Id) => {
	return fetch(`https://my-games-project.herokuapp.com/api/reviews/${Id}`).then(
		(data) => {
			return data.json();
		}
	);
};

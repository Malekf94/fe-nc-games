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

exports.patchReviewById = (Id, voteChange) => {
	return fetch(`https://my-games-project.herokuapp.com/api/reviews/${Id}`, {
		method: "PATCH",
		body: JSON.stringify(voteChange),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	}).then((data) => {
		return data.json();
	});
};

exports.getCommentsById = (Id) => {
	return fetch(
		`https://my-games-project.herokuapp.com/api/reviews/${Id}/comments`
	).then((data) => {
		return data.json();
	});
};

exports.getUsers = () => {
	return fetch(`https://my-games-project.herokuapp.com/api/users`).then(
		(data) => {
			return data.json();
		}
	);
};

exports.addCommentById = (Id, inputComment) => {
	return fetch(
		`https://my-games-project.herokuapp.com/api/reviews/${Id}/comments`,
		{
			method: "POST",
			body: JSON.stringify(inputComment),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		}
	)
		.then((data) => {
			return data.json();
		})
		.catch(console.log);
};

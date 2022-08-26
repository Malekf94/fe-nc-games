import axios from "axios";

export const getReviews = (queries) => {
	return fetch(
		`https://my-games-project.herokuapp.com/api/reviews${queries}`
	).then((data) => {
		return data.json();
	});
};

export const getCategories = () => {
	return fetch("https://my-games-project.herokuapp.com/api/categories").then(
		(data) => {
			return data.json();
		}
	);
};

export const getReviewById = (Id) => {
	return axios
		.get(`https://my-games-project.herokuapp.com/api/reviews/${Id}`)
		.then(({ data }) => {
			return data;
		})
		.catch((error) => {
			throw error;
		});
};

export const patchReviewById = (Id, voteChange) => {
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

export const getCommentsById = (Id) => {
	return axios
		.get(`https://my-games-project.herokuapp.com/api/reviews/${Id}/comments`)
		.then(({ data }) => {
			return data;
		})
		.catch((error) => {
			throw error;
		});
};

export const getUsers = () => {
	return fetch(`https://my-games-project.herokuapp.com/api/users`).then(
		(data) => {
			return data.json();
		}
	);
};

export const addCommentById = (Id, inputComment) => {
	return axios
		.post(
			`https://my-games-project.herokuapp.com/api/reviews/${Id}/comments`,
			inputComment
			// method: "POST",
			// body: JSON.stringify(inputComment),
			// headers: {
			// 	"Content-type": "application/json; charset=UTF-8",
			// },
		)
		.then(({ data }) => {
			return data;
		})
		.catch((error) => {
			throw error;
		});
};

export const deleteCommentById = (Id) => {
	return fetch(`https://my-games-project.herokuapp.com/api/comments/${Id}`, {
		method: "DELETE",
	}).then(() => {
		return "Comment deleted";
	});
};

export const getUser = (username) => {
	return axios
		.get(`https://my-games-project.herokuapp.com/api/users/${username}`)
		.then(({ data }) => {
			return data;
		})
		.catch((error) => {
			throw error;
		});
};

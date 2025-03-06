class ValidationError extends Error {
	constructor(message) {
		super(message);
		this.name = "ValidationError";
		this.statusCode = 400; // Код состояния для ошибки валидации
	}
}

class NotFoundError extends Error {
	constructor(message) {
		super(message);
		this.name = "NotFoundError";
		this.statusCode = 404; // Код состояния для не найденного ресурса
	}
}

export { ValidationError, NotFoundError };

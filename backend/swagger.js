const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
	definition: {
		openapi: "3.0.0", // Версия OpenAPI
		info: {
			title: "My API",
			version: "1.0.0",
			description: "API документация swagger-jsdoc",
		},
	},
	apis: ["./index.js"], // Путь к вашим маршрутам
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;

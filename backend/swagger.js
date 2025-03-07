import swaggerJsDoc from "swagger-jsdoc";

// Swagger setup
const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "Events API",
			version: "1.0.0",
			description: "API for managing events",
		},
		servers: [
			{
				url: "http://localhost:5000",
			},
		],
		components: {
			securitySchemes: {
				ApiKeyAuth: {
					type: "apiKey",
					in: "header",
					name: "api_key",
					description: "API Key для доступа к защищенным маршрутам",
				},
			},
		},
		security: [
			{
				ApiKeyAuth: [1234],
			},
		],
	},
	apis: ["./index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
	"postgres://postgres:123@localhost:5432/events_app"
);
// try {
// 	await sequelize.authenticate();
// 	console.log("Connection has been established successfully.");
// } catch (error) {
// 	console.error("Unable to connect to the database:", error);
// }
module.exports = sequelize;

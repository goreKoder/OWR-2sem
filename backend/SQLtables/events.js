const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db.js"); // Убедитесь, что путь к вашему файлу конфигурации корректен
const User = require("./users.js");
class Event extends Model {}

Event.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false, // Обязательное поле
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true, // Необязательное поле
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false, // Обязательное поле
		},
		createdby: {
			type: DataTypes.INTEGER,
			allowNull: false, // Обязательное поле
			references: {
				model: "Users", // Имя таблицы, на которую ссылаемся
				key: "id", // Поле, на которое ссылаемся
			},
		},
		startDate: {
			type: DataTypes.DATE,
			allowNull: false, // Обязательное поле
		},
		endDate: {
			type: DataTypes.DATE,
			allowNull: false, // Обязательное поле
		},
	},
	{
		sequelize,
		modelName: "Event",
		tableName: "events", // Название таблицы в БД
		timestamps: false, // Включить поля createdAt и updatedAt
	}
);
// Установка ассоциации "многие к одному"
// Event.belongsTo(User, {
// 	foreignKey: "createdBy", // Указываем внешний ключ в таблице мероприятий
// 	targetKey: "id", // Указываем, что поле id в таблице пользователей является целевым
// });
// Устанавливаем связь
// User.hasMany(Event, { foreignKey: "id" });
// Event.belongsTo(User, { foreignKey: "createdby" });
module.exports = Event;

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Event = require("./events.js"); // Импортируем модель Event
class User extends Model {}
User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false, // Обязательное поле
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false, // Обязательное поле
			unique: true, // Уникальное значение
			validate: {
				isEmail: true, // Проверка на корректность email
			},
		},
		// createdAt: {
		// 	type: DataTypes.DATE,
		// 	allowNull: false,
		// 	defaultValue: DataTypes.NOW, // Установка текущей даты по умолчанию
		// },
	},
	{
		sequelize,
		modelName: "User",
		tableName: "users", // Название таблицы в БД
		timestamps: false, // Убираем автоматическое создание полей createdAt и updatedAt, так как мы сами добавляем createdAt
	}
);
// Установка ассоциации "один ко многим"
// User.hasMany(Event, {
// 	foreignKey: "createdBy", // Указываем внешний ключ в таблице мероприятий
// 	sourceKey: "id", // Указываем, что поле id в таблице пользователей является источником
// });
module.exports = User;

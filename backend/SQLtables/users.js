import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import bcrypt from "bcrypt";
import Event from "./events.js";
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
		password: {
			type: DataTypes.STRING,
			allowNull: false, // Обязательное поле
		},
		role: {
			type: DataTypes.ENUM("user", "admin"), // Добавляем поле role
			defaultValue: "user", // По умолчанию роль — user
		},
	},
	{
		sequelize,
		modelName: "User",
		tableName: "users", // Название таблицы в БД
		timestamps: false, // Убираем автоматическое создание полей createdAt и updatedAt, так как мы сами добавляем createdAt
	}
);
User.beforeCreate(async (user) => {
	user.password = await bcrypt.hash(user.password, 10);
});
User.hasMany(Event, {
	foreignKey: "createdBy", // Внешний ключ в таблице Event
	sourceKey: "id", // Первичный ключ в таблице User
});
export default User;

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db'; // Убедитесь, что путь к вашему файлу конфигурации корректен
// import User from './users';
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
        model: 'users', // Имя таблицы, на которую ссылаемся
        key: 'id', // Поле, на которое ссылаемся
      },
    },
    startdate: {
      type: DataTypes.DATE,
      allowNull: false, // Обязательное поле
    },
    enddate: {
      type: DataTypes.DATE,
      allowNull: false, // Обязательное поле
    },
  },
  {
    sequelize,
    modelName: 'Event',
    tableName: 'events', // Название таблицы в БД
    timestamps: false, // Включить поля createdAt и updatedAt
  },
);
// Установка ассоциации "многие к одному"
// Event.belongsTo(User, {
// 	foreignKey: "createdBy", // Указываем внешний ключ в таблице мероприятий
// 	targetKey: "id", // Указываем, что поле id в таблице пользователей является целевым
// });

export default Event;

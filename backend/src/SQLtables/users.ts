import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';
import bcrypt from 'bcrypt';
import Event from './events';
// 1. Интерфейс для атрибутов пользователя
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

// 2. Интерфейс для атрибутов при создании (без id)
// interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
type UserCreationAttributes = Optional<UserAttributes, 'id'>;

// 3. Класс модели с типизацией
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: 'user' | 'admin';

  // Метод для проверки пароля
  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}
// class User extends Model {}
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
      type: DataTypes.ENUM('user', 'admin'), // Добавляем поле role
      defaultValue: 'user', // По умолчанию роль — user
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users', // Название таблицы в БД
    timestamps: false, // Убираем автоматическое создание полей createdAt и updatedAt, так как мы сами добавляем createdAt
  },
);
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});
User.hasMany(Event, {
  foreignKey: 'createdBy', // Внешний ключ в таблице Event
  sourceKey: 'id', // Первичный ключ в таблице User
});
export default User;

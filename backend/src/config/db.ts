import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('postgres://postgres:123@localhost:5432/events_app');
export default sequelize;

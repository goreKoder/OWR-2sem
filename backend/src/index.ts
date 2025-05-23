import 'tsconfig-paths/register';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import configurePassport from '@config/passport';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
// import { errorHandler } from './errors';
import loginJwt from '@routes/auth';
import getEvent from '@routes/public';
import forIndex from '@routes/index';
import sequelize from '@config/db';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API документация',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.ts'], // Путь к вашим роутерам
};
dotenv.config();
// Создаем объект приложения
const app = express();
// Настраиваем middleware

app.use(express.json()); // Для обработки входящих JSON-запросов
app.use(cors()); // Для разрешения кросс-доменных запросов
app.use(morgan('combined'));

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = Number(process.env.PORT || 3000); // Используем PORT из .env или 3000 по умолчанию
// подключаем маршруты из routes
app.use('/auth', loginJwt);
// app.use(configurePassport.initialize); //обрабатываем jwt
app.use('/public', configurePassport.authenticate('jwt', { session: false }), getEvent);
app.use('/index', configurePassport.authenticate('jwt', { session: false }), forIndex);

// app.use(errorHandler);

// Запускаем сервер
app.listen(PORT, 'localhost', (err) => {
  if (err) {
    console.log(`Всё сломалось... Всё сломалось!!! ${err}`);
  }
  console.log(`Сервер запущен на порту ${PORT}`);
});

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('подключение к базе данных прошло успешно');
    await sequelize.sync(); //{ force: true } для пересоздания  { alter: true } для добавления
    console.log('Все модели успешно синхронизированы');
  } catch (error) {
    console.error('нет подключения к базе данных: ', error);
  }
};
checkConnection();

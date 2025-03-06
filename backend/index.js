import loginJwt from "./routes/auth.js";
import getEvent from "./routes/public.js";
import forIndex from "./routes/index.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import passport from "passport";
import configurePassport from "./config/passport.js";
import swaggerDocs from "./swagger.js";
import sequelize from "./config/db.js";
import { ValidationError, NotFoundError } from "./errors.js";
// import User from "./SQLtables/users.js";
// import Event from "./SQLtables/events.js";
// Создаем объект приложения
const app = express();
// Настраиваем middleware
// configurePassport(passport);  // не работает (да и не надо)

app.use(express.json()); // Для обработки входящих JSON-запросов
app.use(cors()); // Для разрешения кросс-доменных запросов
app.use(morgan("combined"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use((err, req, res, next) => {
	if (err instanceof ValidationError) {
		return res.status(err.statusCode).json({ error: err.message });
	}
	if (err instanceof NotFoundError) {
		return res.status(err.statusCode).json({ error: err.message });
	}
	// Обработка других ошибок
	return res.status(500).json({ error: "Внутренняя ошибка сервера" });
});

dotenv.config();
const PORT = process.env.PORT || 3000; // Используем PORT из .env или 3000 по умолчанию
/**
 * @swagger
 * /:
 *   get:
 *     summary: Отображает приветственное сообщение
 *     responses:
 *       200:
 *         description: Успешный ответ
 */
app.use("/auth", loginJwt); // подключаем маршруты из routes
app.use("/public", getEvent);
// app.use(passport.initialize);
app.use("/index", forIndex);

// Запускаем сервер
app.listen(PORT, "localhost", (err) => {
	if (err) {
		console.log(`Всё сломалось... Всё сломалось!!! ${err}`);
	}
	console.log(`Сервер запущен на порту ${PORT}`);
});

const checkConnection = async () => {
	try {
		await sequelize.authenticate();
		console.log("подключение к базе данных прошло успешно");
		await sequelize.sync(); //{ force: true } для пересоздания  { alter: true } для добавления
		console.log("Все модели успешно синхронизированы");
	} catch (error) {
		console.error("нет подключения к базе данных: ", error);
	}
};
checkConnection();

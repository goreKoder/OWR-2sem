const express = require("express");
require("dotenv").config();
const cors = require("cors");
var morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger");
const { ValidationError, NotFoundError } = require("./errors.js");
const User = require("./SQLtables/users.js");
const Event = require("./SQLtables/events.js");
// Создаем объект приложения
const app = express();
// Настраиваем middleware
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
app.get("/events", async (req, res) => {
	try {
		// GET /events?startDate=2023-01-01&endDate=2023-12-31
		const { startDate, endDate } = req.query;
		// const events = await Event.findAll(); // Получаем всех пользователей
		const events = await Event.findAll({
			where: {
				date: {
					[Op.between]: [new Date(startDate), new Date(endDate)],
				},
			},
		});
		res.status(200).json(events);
	} catch (err) {
		res.status(500).send("ошибка сервера", err);
	}
});
app.get("/events/:id", async (req, res) => {
	try {
		const paramID = req.params.id;
		const eventss = await Event.findByPk(paramID); // Поиск мероприятия по ID
		res.status(200).json(eventss);
	} catch (err) {
		res.send(new NotFoundError("событие не нейдено"));

		// res.status(500).send("ошибка сервера");
	}
});
app.post("/events", async (req, res) => {
	try {
		const { title, description, date, createdby, startDate, endDate } =
			req.body;
		const eventss = await Event.create({
			title,
			description,
			date,
			createdby,
			startDate,
			endDate,
		});
		res.status(201).json(eventss);
	} catch (err) {
		res.send(new ValidationError("ошибка валидации"));
		// res.status(500).send("ошибка сервера");
	}
});
app.put("/events/:id", async (req, res) => {
	try {
		const paramID = req.params.id;
		const { title, description, date, createdBy, startDate, endDate } =
			req.body;
		const [updatedRowsCount, [updatedUser]] = await Event.update(
			{ title, description, date, createdBy, startDate, endDate }, // Поля для обновления
			{
				where: { id: paramID }, // Условие для поиска пользователя
				returning: true, // Возвращаем обновленную запись
			}
		);
		if (updatedRowsCount === 0) {
			res.send(NotFoundError("событие не нейдено"));
		}
		res.status(200).json(updatedUser); // Отправляем обновленного пользователя
	} catch (err) {
		res.send(new ValidationError("ошибка валидации"));

		// res.status(500).send("ошибка сервера");
	}
});
app.delete("/events/:id", async (req, res) => {
	try {
		const eventid = req.params.id;
		const del = await Event.destroy({
			where: {
				id: eventid,
			},
		});
		res.status(200).send(del);
	} catch (err) {
		res.send(new NotFoundError("событие не нейдено"));

		// res.status(500).send("ошибка сервера");
	}
});
app.get("/users", async (req, res) => {
	try {
		const users = await User.findAll();
		res.status(200).json(users);
	} catch (err) {
		res.status(500).send("ошибка сервера");
	}
});
app.post("/users", async (req, res) => {
	try {
		const { name, email } = req.body;
		const userss = await User.create({
			name,
			email,
		});
		res.status(200).json(userss);
	} catch (err) {
		res.send(new ValidationError("ошибка валидации"));

		// res.status(500).send("всё поломалося" + err);
	}
});
// Запускаем сервер
app.listen(PORT, "localhost", (err) => {
	if (err) {
		console.log(`Всё сломалось... Всё сломалось!!! ${err}`);
	}
	console.log(`Сервер запущен на порту ${PORT}`);
});

const sequelize = require("./config/db.js");
const checkConnection = async () => {
	try {
		await sequelize.authenticate();
		console.log("подключение к базе данных прошло успешно");
		await sequelize.sync();
		console.log("Все модели успешно синхронизированы");
	} catch (error) {
		console.error("жопа с базой: ", error);
	}
};
checkConnection();

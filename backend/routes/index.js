import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../SQLtables/users.js";
import Event from "../SQLtables/events.js";
import passport from "passport";
import dotenv from "dotenv";
import { ValidationError, NotFoundError } from "../errors.js";

dotenv.config();
const secretKey = process.env.JWT_SECRET;
const router = express.Router();
router.use(passport.authenticate("jwt", { session: false }));
router.get("/events", async (req, res) => {
	try {
		let userId;
		const token = req.headers["authorization"].split(" ")[1]; // Извлечение токена
		if (!token) {
			return res.status(401).json({ error: "нет никакого токена" });
		}
		jwt.verify(token, secretKey, (err, decoded) => {
			if (err) {
				return res.status(401).json({ error: "фиговый токен" });
			}
			// Теперь вы можете использовать данные из decoded
			userId = decoded.id; // Например, извлечение идентификатора пользователя
		});

		const eventss = await Event.findByPk(userId); // Поиск мероприятия по ID
		res.status(200).json(eventss);
	} catch (err) {
		res.json(new NotFoundError("событие не нейдено") + err);
	}
});
router.post("/events", async (req, res) => {
	try {
		let createdby;
		const token = req.headers["authorization"].split(" ")[1]; // Извлечение токена
		if (!token) {
			return res.status(401).json({ error: "нет никакого токена" });
		}
		jwt.verify(token, secretKey, (err, decoded) => {
			if (err) {
				return res.status(401).json({ error: "фиговый токен" });
			}
			// Теперь вы можете использовать данные из decoded
			createdby = decoded.id; // Например, извлечение идентификатора пользователя
		});
		const { title, description, date, startdate, enddate } = req.body;
		const events = await Event.create({
			title,
			description,
			date,
			createdby,
			startdate,
			enddate,
		});
		res.status(201).json(events);
	} catch (err) {
		res.json(new ValidationError("ошибка валидации") + err);
		// res.status(500).send("ошибка сервера");
	}
	// {
	// 	"title": "Новое мероприятие",
	// 	"description": "Описание мероприятия",
	// 	"date": "2023-10-25T10:00:00Z",
	// 	"startdate": "2023-10-25T09:00:00Z",
	// 	"enddate": "2023-10-25T11:00:00Z"
	// }
});

router.put("/events/:id", async (req, res) => {
	try {
		let userId;
		const token = req.headers["authorization"].split(" ")[1]; // Извлечение токена
		if (!token) {
			return res.status(401).json({ error: "нет никакого токена" });
		}
		jwt.verify(token, secretKey, (err, decoded) => {
			if (err) {
				return res.status(401).json({ error: "фиговый токен" });
			}
			// Теперь вы можете использовать данные из decoded
			userId = decoded.id; // Например, извлечение идентификатора пользователя
		});
		const eventid = req.params.id;
		const { title, description, date, startdate, enddate } = req.body;
		const [updatedRowsCount, [updatedUser]] = await Event.update(
			{ title, description, date, createdBy: userId, startdate, enddate }, // Поля для обновления
			{
				where: { id: eventid }, // Условие для поиска пользователя
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
router.delete("/events/:id", async (req, res) => {
	try {
		const token = req.headers["authorization"].split(" ")[1]; // Извлечение токена
		if (!token) {
			return res.status(401).json({ error: "нет никакого токена" });
		}
		jwt.verify(token, secretKey, (err, decoded) => {
			if (err) {
				return res.status(401).json({ error: "фиговый токен" });
			}
		});
		const eventid = req.params.id;
		const del = await Event.destroy({
			where: {
				id: eventid,
			},
		});
		res.status(200).json(del);
	} catch (err) {
		res.send(new NotFoundError("событие не нейдено"));

		// res.status(500).send("ошибка сервера");
	}
});
export default router;

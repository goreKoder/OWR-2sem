import express from "express";
import User from "../SQLtables/users.js";
import Event from "../SQLtables/events.js";
import path from "path";
import { fileURLToPath } from "url";
import { getUserRole } from "../config/passport.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
router.get("/events", async (req, res) => {
	/**
	 * @swagger
	 * /events:
	 *   get:
	 *     summary:
	 *     responses:
	 *       200:
	 *         description: выводим массив событий
	 */
	try {
		// GET http://localhost:5000/events?startdate=2023-10-25T10:00:00Z&enddate=2023-10-27T11:00:00Z
		const token = req.headers["authorization"].split(" ")[1]; // Извлечение токена
		const userRole = getUserRole(token);
		if (userRole !== "admin") {
			res.status(400).sendFile("ad1ea489daeda0af0a16fea188c87452.jpg");
		}
		const { startdate, enddate } = req.query;
		const events = await Event.findAll({
			where: {
				date: {
					[Op.between]: [new Date(startdate), new Date(enddate)],
				},
			},
		});
		res.status(200).json(events);
	} catch (err) {
		res.status(500).json("ошибка сервера" + err);
	}
});
router.get("/users", async (req, res) => {
	/**
	 * @swagger
	 * /users:
	 *   get:
	 *     summary:
	 *     responses:
	 *       200:
	 *         description: выводим список пользователей
	 */
	try {
		const token = req.headers["authorization"].split(" ")[1]; // Извлечение токена
		const userRole = await getUserRole(token);
		const imagePath = path.join(
			__dirname,
			"ad1ea489daeda0af0a16fea188c87452.jpg"
		);
		if (userRole != "admin") {
			res.status(400).sendFile(imagePath);
		} else {
			const users = await User.findAll();
			res.status(200).json(users);
		}
	} catch (err) {
		res.status(500).json("ошибка сервера " + err);
	}
});
router.patch("/users/:id/role", async (req, res) => {
	/**
	 * @swagger
	 * /public/users/{id}/role:
	 *   patch:
	 *     summary:
	 *     responses:
	 *       200:
	 *         description: изменяем роль пользователя
	 */
	try {
		let userId = req.params.id;
		const token = req.headers["authorization"].split(" ")[1]; // Извлечение токена
		const userRole = await getUserRole(token);
		const imagePath = path.join(
			__dirname,
			"ad1ea489daeda0af0a16fea188c87452.jpg"
		);
		if (userRole != "admin") {
			res.status(400).sendFile(imagePath);
		} else {
			const users = await User.update(req.body, {
				where: { id: userId }, // Условие для поиска пользователя
				returning: true, // Возвращаем обновленную запись
			});
			res.status(200).json(users);
		}
	} catch (err) {
		res.status(500).json("ошибка сервера " + err);
	}
});
export default router;

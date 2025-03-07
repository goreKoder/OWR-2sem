import express from "express";
import User from "../SQLtables/users.js";
import Event from "../SQLtables/events.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import passport from "passport";
import { ValidationError, NotFoundError } from "../errors.js";

dotenv.config();
const secretKey = process.env.JWT_SECRET;
const router = express.Router();
router.use(passport.authenticate("jwt", { session: false }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
router.get("/events", async (req, res) => {
	try {
		// GET http://localhost:5000/events?startdate=2023-10-25T10:00:00Z&enddate=2023-10-27T11:00:00Z
		let userRole;
		const token = req.headers["authorization"].split(" ")[1]; // Извлечение токена
		if (!token) {
			return res.status(401).json({ error: "нет никакого токена" });
		}
		jwt.verify(token, secretKey, (err, decoded) => {
			if (err) {
				return res.status(401).json({ error: "фиговый токен" });
			}
			// Теперь вы можете использовать данные из decoded
			userRole = decoded.role;
		});
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
	try {
		let userRole;
		const token = req.headers["authorization"].split(" ")[1]; // Извлечение токена
		if (!token) {
			return res.status(401).json({ error: "нет никакого токена" });
		}
		jwt.verify(token, secretKey, (err, decoded) => {
			if (err) {
				return res.status(401).json({ error: "фиговый токен" });
			}
			// Теперь вы можете использовать данные из decoded
			userRole = decoded.role;
		});
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
	try {
		let userId = req.params.id;
		let userRole;
		const token = req.headers["authorization"].split(" ")[1]; // Извлечение токена
		if (!token) {
			return res.status(401).json({ error: "нет никакого токена" });
		}
		jwt.verify(token, secretKey, (err, decoded) => {
			if (err) {
				return res.status(401).json({ error: "фиговый токен" });
			}
			// Теперь вы можете использовать данные из decoded
			userRole = decoded.role;
		});
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

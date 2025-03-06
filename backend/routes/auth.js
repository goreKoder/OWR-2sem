import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../SQLtables/users.js";
import Event from "../SQLtables/events.js";
import dotenv from "dotenv";
import { ValidationError, NotFoundError } from "../errors.js";

dotenv.config();
const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { email, name, password } = req.body;
		const user = await User.create({ email, name, password });
		res.status(200).send("Аутентификация успешна");
	} catch (err) {
		res.status(500).json("ошибка сервера" + err);
	}
});
// {
// 	"name": "апапап",
// 	"email": "chtoto@mail.ru",
//  "password": "parol"
// }
router.post("/login", async (req, res) => {
	let { email, password } = req.body;
	try {
		const user = await User.findOne({
			where: { email: email },
		});
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json("Неверный пароль");
		}
		const tocen = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		}); //  потом попробовать просто user.id
		res.status(200).json("Авторизация успешна, вот токен:  " + tocen);
	} catch (err) {
		console.log(err);
		res.status(500).json("ошибка сервера" + err);
	}
});
export default router;

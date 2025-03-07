import express from "express";
import User from "../SQLtables/users.js";
import Event from "../SQLtables/events.js";
import dotenv from "dotenv";
import { createJWT } from "../config/passport.js";

dotenv.config();
const router = express.Router();

router.post("/register", async (req, res) => {
	/**
	 * @swagger
	 * /auth/register:
	 *   post:
	 *     summary:
	 *     responses:
	 *       200:
	 *         description: регистрация
	 */
	try {
		const { email, name, password, role } = req.body;
		const user = await User.create({ email, name, password, role });
		res.status(200).send("Аутентификация успешна");
	} catch (err) {
		res.status(500).json("ошибка сервера" + err);
	}
});
// {
// 	"name": "апапап",
// 	"email": "chtoto@mail.ru",
//  "password": "parol"
//  "role": "user"
// }
router.post("/login", async (req, res) => {
	/**
	 * @swagger
	 * /auth/login:
	 *   post:
	 *     summary:
	 *     responses:
	 *       200:
	 *         description: авторизация
	 */
	let { email, password } = req.body;
	try {
		const user = await User.findOne({
			where: { email: email },
		});
		const JWTtocen = await createJWT(user, password);
		res.status(200).json("Авторизация успешна, вот токен:  " + JWTtocen);
	} catch (err) {
		console.log(err);
		res.status(500).json("ошибка сервера" + err);
	}
});
export default router;

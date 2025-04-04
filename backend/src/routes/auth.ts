import express, {Request, Response} from "express";
import User from "../SQLtables/users";
import Event from "../SQLtables/events";
import dotenv from "dotenv";
import { createJWT } from "../config/passport";

dotenv.config();
const router = express.Router();
interface UserData {
	email: string;
	name: string;
	password: string;
	role: string;
}
router.post("/register", async (req: Request, res:Response) => {
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
		const { email, name, password, role }: UserData = req.body;
		const user = await User.create({ email, name, password, role: role as 'user' | 'admin' });
		res.status(200).send("Аутентификация успешна" );
	} catch (err) {
		res.status(500).json(`ошибка сервера ${err}`);
	}
});
// {
// 	"name": "апапап",
// 	"email": "chtoto@mail.ru",
//  "password": "parol"
//  "role": "user"
// }
router.post("/login", async (req: Request, res:Response) => {
	/**
	 * @swagger
	 * /auth/login:
	 *   post:
	 *     summary:
	 *     responses:
	 *       200:
	 *         description: авторизация
	 */
	const { email, password }: UserData = req.body;
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

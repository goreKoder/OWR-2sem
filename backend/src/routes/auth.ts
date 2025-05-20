import express, { Request, Response } from 'express';
import User from '@SQLtables/users';
import dotenv from 'dotenv';
import { createJWT } from '@config/passport';

dotenv.config();
const router = express.Router();
interface UserData {
  email: string;
  firstName:string;//имя
  lastName:string;//фамилия
  patronymic:string;//отчество
  gender: "М"| "Ж";
  birthday: Date;
  password: string;
  role: 'user' | 'admin';
}
router.post('/register', async (req: Request, res: Response) => {
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
    const { email, firstName,lastName,patronymic, password,gender,birthday, role }: UserData = req.body;
    const user = await User.create({ email, firstName,lastName,patronymic, password,gender,birthday, role });
    res.status(200).send(user);
    console.log("Регистрация успешна")
  } catch (err) {
    res.status(500).json("почта уже используется"+err);
  }
});
// {
// 	"name": "апапап",
// 	"email": "chtoto@mail.ru",
//  "password": "parol"
//  "role": "user"
// }
router.post('/login', async (req: Request, res: Response) => {
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
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    const JWTtocen = await createJWT(user, password);
    res.status(200).send({JWTtocen,user});
    console.log("Авторизация успешна")
    console.log("токен отправлен")
  } catch (err) {
    res.status(500).json(err);
    console.log("токен не отправлен"+err)
  }
});
export default router;

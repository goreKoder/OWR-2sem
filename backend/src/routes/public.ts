import express, { Request, Response } from 'express';
import User from '@SQLtables/users';
import Event from '@SQLtables/events';
import { Op } from 'sequelize';
import { getUserID, getUserRole } from '@config/passport';
const router = express.Router();
router.get('/events', async (req: Request, res: Response) => {
  /**
   * @swagger
   * /events:
   *   get:
   *     summary:
   *     responses:
   *       200:
   *         description: выводим массив событий
   */
  // interface DateEvent {
  //   startdate: string;
  //   enddate: string;
  // }
  try {
    // GET http://localhost:5000/events?startdate=2023-10-25T10:00:00Z&enddate=2023-10-27T11:00:00Z
    let token: string = '';
    const authorization = req.headers['authorization']; // Извлечение токена
    if (authorization) {
      token = authorization.split(' ')[1];
    }
    const UserID = await getUserID(token);
    // const userRole = await getUserRole(token);
    // if (userRole !== 'admin') {
    //   res.status(400).sendFile('ad1ea489daeda0af0a16fea188c87452.jpg');
    // }
    const { startdate, enddate } = req.query;

    const events = await Event.findAll({
      where: {
        createdby: UserID,
        date: {
          [Op.between]: [new Date(String(startdate)), new Date(String(enddate))],
        },
      },
    });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json('ошибка сервера' + err);
  }
});
router.get('/users', async (req: Request, res: Response) => {
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
    let token: string = '';
    const authorization = req.headers['authorization']; // Извлечение токена
    if (authorization) {
      token = authorization.split(' ')[1];
    }
    const userRole = await getUserRole(token);
    // const imagePath = path.join(
    // 	__dirname,
    // 	"ad1ea489daeda0af0a16fea188c87452.jpg"
    // );
    if (userRole != 'admin') {
      // res.status(400).sendFile(imagePath);
      res.status(400).send('ты не админ');
    } else {
      const users = await User.findAll();
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).json('ошибка сервера ' + err);
  }
});
router.patch('/users/:id/role', async (req: Request, res: Response) => {
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
    const userId = req.params.id;
    let token: string = '';
    const authorization = req.headers['authorization']; // Извлечение токена
    if (authorization) {
      token = authorization.split(' ')[1];
    }
    const userRole = await getUserRole(token);
    // const imagePath = path.join(
    // 	__dirname,
    // 	"ad1ea489daeda0af0a16fea188c87452.jpg"
    // );
    if (userRole != 'admin') {
      // res.status(400).sendFile(imagePath);
      res.status(400).send('ты не админ');
    } else {
      const users = await User.update(req.body, {
        where: { id: userId }, // Условие для поиска пользователя
        returning: true, // Возвращаем обновленную запись
      });
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).json('ошибка сервера ' + err);
  }
});
export default router;

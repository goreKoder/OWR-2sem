import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Event from '@SQLtables/events';
import { ValidationError, NotFoundError } from '../errors';
import { getUserID } from '@config/passport';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const secretKey: string | undefined = String(process.env.JWT_SECRET);

// interface UserData {
//   email: string;
//   name: string;
//   password: string;
//   role: string;
// }

router.get('/events', async (req: Request, res: Response) => {
  /**
   * @swagger
   * /events/{id}:
   *   get:
   *     summary:
   *     responses:
   *       200:
   *         description: выводим одного события
   */
  try {
    let token: string = '';
    const authorization = req.headers['authorization']; // Извлечение токена
    if (authorization) {
      token = authorization.split(' ')[1];
    }

    const UserID = await getUserID(token);// Поиск мероприятия по ID
    const eventss = await Event.findAll({
      where: {
        createdby: UserID, // Ищем все события, где userId равен переданному значению
      },
    });
    res.status(200).json(eventss);
    console.log("Массив отправлен")
  } catch (err) {
    res.json(new NotFoundError('событие не нейдено' + err));
  }
});
router.post('/events', async (req: Request, res: Response) => {
  /**
   * @swagger
   * /events:
   *   post:
   *     summary:
   *     responses:
   *       200:
   *         description: добавляем события
   */
  try {
    let token: string = '';
    const authorization = req.headers['authorization']; // Извлечение токена
    if (authorization) {
      token = authorization.split(' ')[1];
    }
    const { title, description, date, startdate, enddate } = req.body;
    const createdby = await getUserID(token);
    console.log(createdby);
    console.log(getUserID(token));
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
    res.json(new ValidationError('ошибка валидации' + err));
  }
  // {
  // 	"title": "Новое мероприятие",
  // 	"description": "Описание мероприятия",
  // 	"date": "2023-10-25T10:00:00Z",
  // 	"startdate": "2023-10-25T09:00:00Z",
  // 	"enddate": "2023-10-25T11:00:00Z"
  // }
});

router.put('/events/:id', async (req: Request, res: Response) => {
  /**
   * @swagger
   * /events/{id}:
   *   put:
   *     summary:
   *     responses:
   *       200:
   *         description: редактирование события
   */
  try {
    let token: string = '';
    const authorization = req.headers['authorization']; // Извлечение токена
    if (authorization) {
      token = authorization.split(' ')[1];
    }
    const userId = await getUserID(token);
    const eventid = req.params.id;
    const { title, description, date, startdate, enddate } = req.body;
    const [updatedRowsCount, [updatedUser]] = await Event.update(
      { title, description, date, createdBy: userId, startdate, enddate }, // Поля для обновления
      {
        where: { id: eventid }, // Условие для поиска пользователя
        returning: true, // Возвращаем обновленную запись
      },
    );
    if (updatedRowsCount === 0) {
      res.send(new NotFoundError('событие не нейдено'));
    }
    res.status(200).json(updatedUser); // Отправляем обновленного пользователя
  } catch (err) {
    res.send(new ValidationError('ошибка валидации ' + err));
  }
});
router.delete('/events/:id', async (req: Request, res: Response) => {
  /**
   * @swagger
   * /events/{id}:
   *   delete:
   *     summary:
   *     responses:
   *       200:
   *         description: удаляем событие
   */
  try {
    let token: string = '';
    const authorization = req.headers['authorization']; // Извлечение токена
    if (authorization) {
      token = authorization.split(' ')[1];
    }
    jwt.verify(token, secretKey, (err) => {
      if (err) {
        return res.status(401).json({ error: 'не коректный токен ' + err });
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
    res.send(new NotFoundError('событие не нейдено ' + err));
  }
});
export default router;

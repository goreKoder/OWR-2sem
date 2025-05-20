import { ErrorRequestHandler, Request, Response } from 'express';
class ValidationError extends Error {
  statusCode: number; // Явное объявление свойства
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400; // Код состояния для ошибки валидации
  }
}

class NotFoundError extends Error {
  statusCode: number; // Явное объявление свойства
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404; // Код состояния для не найденного ресурса
  }
}

// export const errorHandler: ErrorRequestHandler = (
//   err: Error,
//   req: Request,
//   res: Response,
//   // next: NextFunction,
// ) => {
//   if (err instanceof ValidationError) {
//     res.status(err.statusCode).json({ error: err.message });
//     return;
//   }
//   if (err instanceof NotFoundError) {
//     res.status(err.statusCode).json({ error: err.message });
//     return;
//   }
//   // Обработка других ошибок
//   console.log("ошибка которую мы получаем")
//   // console.log(err)
//   // res.json('Внутренняя ошибка сервера' + err);
// };

export { ValidationError, NotFoundError };

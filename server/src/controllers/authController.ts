import { Request, Response,RequestHandler } from 'express';
import { pool } from '../db';
import { hashPassword, comparePassword } from '../utils/hash';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const hashed = await hashPassword(password);
  await pool.query(
    'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4)',
    [username, email, hashed, 'user']
  );

  res.status(201).json({ message: 'Пользователь зарегистрирован' });
};

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

  // if (result.rowCount === 0)
  //   return res.status(401).json({ error: 'Неверный email или пароль' }) ;

  const user = result.rows[0];
  const match = await comparePassword(password, user.password_hash);

  // if (!match)
  //   return res.status(401).json({ error: 'Неверный email или пароль' });

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );

  res.json({ token }); // возвращаем результат с Response
};

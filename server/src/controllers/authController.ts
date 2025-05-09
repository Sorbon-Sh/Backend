// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import { pool } from '../db';
import { hashPassword, comparePassword } from '../utils/hash';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const hashed = await hashPassword(password);

    await pool.query(
      'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4)',
      [username, email, hashed, 'user']
    );

    res.status(201).json({ message: 'Пользователь зарегистрирован' });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rowCount === 0) {
      res.status(401).json({ error: 'Неверный email или пароль' });
      return;
    }

    const user = result.rows[0];
    const match = await comparePassword(password, user.password_hash);
    if (!match) {
      res.status(401).json({ error: 'Неверный email или пароль' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

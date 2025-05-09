import express from 'express';
import dotenv from 'dotenv';
import { pool } from './db';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
app.use(express.json());

// Маршрут для проверки подключения к БД
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// Основные маршруты авторизации
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

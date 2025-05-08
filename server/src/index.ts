import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';


dotenv.config();
const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API работает');
  });

app.listen(3001, () => console.log('🚀 Сервер запущен на http://localhost:3001'));

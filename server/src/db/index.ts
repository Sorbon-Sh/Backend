import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


export const pool = new Pool({
  user: 'postgres',
  host: 'pg-server', //  имя сервиса из docker-compose
  database: 'mydatabase',
  password: 'mysecretpassword',
  port: 5432,
});



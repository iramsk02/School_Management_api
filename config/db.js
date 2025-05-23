import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
// dotenv.config({ path: path.resolve('./.env') });
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "#Ir@msabak02",
  database: "student_management",
});

export default pool;

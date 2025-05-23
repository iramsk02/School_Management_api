import pool from './db.js';

const createTable = async () => {


    console.log("Env Check:", {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        db: process.env.DB_NAME
    });
    const query = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL
    );
  `;

    try {
        const connection = await pool.getConnection();
        await connection.query(query);
        connection.release();
        console.log(" schools' table created successfully.");
    } catch (error) {
        console.error("Error creating table:", error.message);
    }
};

createTable();

import dotenv from 'dotenv';
dotenv.config();

// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: '127.0.0.1',
    database: process.env.DB_NAME,
    port: 5432,
});

const connectToDb = async () => {
    try {
        await pool.connect();
        console.log('Connected to the database.');
    } catch (err) {
        console.error('Error connecting to database:', err);
        process.exit(1);
    }
};

export { pool, connectToDb };

// module.exports = {
//     query: (text: string, params: any[]) => pool.query(text, params),
// }

// export default pool; // Exporting the pool for use in other modules

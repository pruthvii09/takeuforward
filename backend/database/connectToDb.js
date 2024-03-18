import mysql from "mysql2/promise";

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DBNAME,
    });

    console.log("MySQL connected!");
    return connection;
  } catch (error) {
    console.error("MySQL connection FAILED ", error.message);
    process.exit(1);
  }
};

export default connectDB;

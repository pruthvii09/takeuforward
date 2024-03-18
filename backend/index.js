// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./database/connectToDb.js";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(4000, () => {
      console.log("Server Listning...");
    });
  })
  .catch((error) => {
    console.log(error);
  });
export default app;

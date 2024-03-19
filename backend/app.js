import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//routes import
import submissionRoutes from "./routes/submission.routes.js";
import serverless from "serverless-http";

//routes declaration
app.use("/submissions", submissionRoutes);
export default app;
export const handler = serverless(app);

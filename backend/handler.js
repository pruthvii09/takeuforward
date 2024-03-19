"use strict";
import app from "./app.js";
import serverless from "serverless-http";
const hello = serverless(app);
export { hello };

import "dotenv/config";
import createApp, { json } from "express";

import { authRouter } from "./modules/auth/router";

const app = createApp();

app.use(json());

app.use("/", authRouter);

app.listen(3000, () => console.log("Server running at http://localhost:3000"));

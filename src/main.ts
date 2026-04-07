import createApp from "express";
import { createServer } from "http";

import todos from "./routes/todos";

const app = createApp();
const server = createServer(app);

app.use("/todos", todos);

server.listen(3000, "localhost", () => console.log("Listening :3000"));

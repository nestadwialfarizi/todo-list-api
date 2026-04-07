import createApp from "express";

import todos from "./routes/todos";

const app = createApp();

app.use("/todos", todos);

app.listen(3000, () => console.log("Server running at http://localhost:3000"));

import express from "express";
import { router as userRouter } from "./src/api/controllers/user-controller.js";
import { router as appRouter } from "./src/api/controllers/app-controller.js";
import { errorHandler } from "./src/components/error-handler.js";

const PORT = 3001;

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.use("/app", appRouter);
app.use("/user", userRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));


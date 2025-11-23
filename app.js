import express from "express";
import { router } from "./src/api/controllers/user-controller.js";
import { errorHandler } from "./src/components/error-handler.js";

const PORT = 3000;

const app = express();

app.use(express.json());

app.use("/user", router);

app.use(errorHandler);

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));


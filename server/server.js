import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import partyRouter from "./routes/party.js";
import usersRouter from "./routes/users.js";

dotenv.config({ path: "./config.env" });
const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.use("/party", partyRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

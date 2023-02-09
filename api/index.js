import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import apiRoute from "./routes/api.route.js";

dotenv.config();
const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected mongoose!");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("database disconnected");
});

//middleware
app.use(cors());
app.use(express());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to server");
});

app.use("/api", apiRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Someting went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connect();
  console.log("server is runing!");
});

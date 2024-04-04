import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";

// routes
import authRoutes from "./routes/auth.js";

import errorHandlerMiddleware from "./middlewares/error-handler.js";

dotenv.config();

const app = express();

const server = http.createServer(app);
const io = new Server(server);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());

// routes
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    server.listen(PORT, () => {
      console.log(`server running on port ${PORT}...`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();

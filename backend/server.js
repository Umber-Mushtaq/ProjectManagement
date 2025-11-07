import express from "express";
import http from "http";
import userRoutes from "./Routes/user.routes.js";
import adminRoutes from "./Routes/admin.routes.js";
import ConnectDb from "./Database/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { initializeSocket } from "./Socket.Io/socket.js";
dotenv.config();
ConnectDb();

const app = express();
const server = http.createServer(app);
initializeSocket(server);

// middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

import { Server } from "socket.io";

export const userSocketMap = {};
export let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected with socket ${socket.id}`);

    const globalRoom = "global-room";
    socket.join(globalRoom);

    socket.on("register", (userId) => {
      userSocketMap[userId] = socket.id;
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    socket.on("sendMessage", (data) => {
      console.log(`Message from ${data.name}: ${data.message}`);
      io.to(globalRoom).emit("receiveMessage", {
        userId: data.userId,
        name: data.name,
        message: data.message,
        timestamp: new Date(),
      });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      for (const userId in userSocketMap) {
        if (userSocketMap[userId] === socket.id) {
          delete userSocketMap[userId];
          break;
        }
      }
    });
  });
};

import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", { withCredentials: true });
    setSocket(newSocket);

    // connect with backend socket.io
    newSocket.on("connect", () => {
      console.log("Connected to socket.io:", newSocket.id);
    });

    // register current user
    newSocket.emit("register", "Umber Mushtaq");

    // listen for notifications
    newSocket.on("notification", (data) => {
      console.log("notifications", data.message);
      setNotifications((prev) => [...prev, data]);
    });

    // disconnect from backend socket.io
    return () => {
      newSocket.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket, notifications, setNotifications }}>
      {children}
    </SocketContext.Provider>
  );
};

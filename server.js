const express = require("express"); // Import express
const http = require("http"); // Import http
const { Server } = require("socket.io"); // Import the Socket.IO server

const app = express(); // Create an express application
const server = http.createServer(app); // Create a server using the app
const io = new Server(server); // Create a Socket.IO server

// Listen for a connection from a client
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for chat messages from a client
  socket.on("chat message", (msg) => {
    console.log("Message received:", msg); // Log the message
    io.emit("chat message", msg); // Broadcast the message to all connected clients
  });

  // Listen for disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = 5000; // Define the server port
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Start the server
});
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

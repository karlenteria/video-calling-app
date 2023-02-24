const express = require("express");
const http = require("http");

const PORT = 3005;

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

let connectedPeers = [];

io.on("connection", (socket) => {
  console.log(socket.id);
  console.log("a user has connected");
  connectedPeers.push(socket.id);
  socket.on("pre-offer", (data) => {
    const { calleePersonalCode, callType } = data;
    console.log(calleePersonalCode);
    console.log(connectedPeers);
    const connectedPeer = connectedPeers.find(
      (userSocketId) => userSocketId === calleePersonalCode
    );

    if (connectedPeer) {
      const data = {
        callerSocketId: socket.id,
        callType,
      };
      io.to(calleePersonalCode).emit("pre-offer", data);
    } else {
      const data = {
        preOfferAnswer: "CALLEE_NOT_FOUND",
      };
      io.to(socket.id).emit("pre-offer-answer", data);
    }
  });

  socket.on("pre-offer-answer", (data) => {
    console.log(data);
    const { callerSocketId } = data;
    const connectedPeer = connectedPeers.find(
      (userSocketId) => userSocketId === callerSocketId
    );
    if (connectedPeer) {
      io.to(data.callerSocketId).emit("pre-offer-answer", data);
    }
  });

  socket.on("webRTC-signaling", (data) => {
    const { connectedUserSocketId } = data;

    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === connectedUserSocketId
    );

    if (connectedPeer) {
      io.to(connectedUserSocketId).emit("webRTC-signaling", data);
    }
  });

  socket.on("user-hanged-up", (data) => {
    const { connectedUserSocketId } = data;
    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === connectedUserSocketId
    );

    if (connectedPeer) {
      io.to(connectedUserSocketId).emit("user-hanged-up");
    }
  });

  socket.on("disconnect", () => {
    console.log("a user has disconnected");
    let newConnectedUsers = connectedPeers.filter((connectedUser) => {
      return connectedUser !== socket.id;
    });
    connectedPeers = newConnectedUsers;
    console.log(connectedPeers, "user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});

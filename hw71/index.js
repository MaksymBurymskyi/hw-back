import express from "express";
import http from "http";
import { Server } from "socket.io";
import fs from "fs";

const PORT = 3100;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");

io.on("connection", (socket) => {
  console.log("a user connected");

  let userName = "";

  socket.on("send_msg", (data) => {
    if (!userName && data.name) {
      userName = data.name;
      io.emit("new_msg", {
        name: "System Bot",
        msg: `${userName} is connected`,
      });
    } else {
      io.emit("new_msg", { name: data.name, msg: data.msg });
    }
  });

  socket.on("send_usersChat", (data) => {
    const message = JSON.stringify(data);
    fs.writeFile("./public/message/message.txt", message, (err) => {
      if (err) {
        console.error("Error saving chat:", err);
      }
    });
    console.log("chat is saved");
  });

  socket.on("disconnect", (reason) => {
    io.emit("new_msg", {
      name: "System Bot",
      msg: `${userName} is disconnected`,
    });
    console.log(`User disconnect, reason: ${reason}`);
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

const readStream = fs.createReadStream("./public/css/style.css");
const writeStream = fs.createWriteStream("./public/css/style_copy.css");

const handleError = () => {
  console.log("Error");
  readStream.destroy();
  writeStream.end("Finished with error...");
};

readStream.on("error", handleError).pipe(writeStream).on("error", handleError);

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

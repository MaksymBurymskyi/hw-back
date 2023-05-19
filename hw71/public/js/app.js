const socket = io();

const btnName = document.querySelector(".btn-name");
const inputName = document.querySelector(".user-name input");
const userLabel = document.querySelector(".form-msg label");
const login = document.querySelector(".login");
const formMsg = document.querySelector(".form-msg");
const chat = document.querySelector(".chat");
const msg = document.getElementById("msg");
const btnSaveMsg = document.querySelector(".btn-save-msg");
let userName = "";
const usersChat = [];

btnName.addEventListener("click", () => {
  userName = inputName.value;
  userLabel.innerHTML = userName;
  login.style.display = "none";
  socket.emit("send_msg", {
    name: userName,
    msg: `${userName} is connected`,
  });
  msg.value = "";
});

formMsg.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("send_msg", { name: userName, msg: msg.value });
  msg.value = "";
});

const newMessage = (message) => {
  const li = document.createElement("li");
  li.innerHTML = `
  <p class="name">${message.name}</p>
  <p class="message">${message.msg}</p>`;
  chat.appendChild(li);
  usersChat.push(message);
};

socket.on("new_msg", newMessage);

btnSaveMsg.addEventListener("click", () => {
  socket.emit("send_usersChat", { usersChat });
});

// myEmitter.on("error", (err) => {
//   console.clear();
//   console.error("Error:", err.message);
// });

// myEmitter.emit("error", new Error("BOOOOM!!!"));

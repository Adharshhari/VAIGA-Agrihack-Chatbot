let messages = new Map();
let message_container = document.querySelector(".message_container");
let anchor = document.querySelector("#anchor");
let sendBtn = document.querySelector("#msgSubmit");
let submitForm = document.querySelector("form");
submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let textInput = e.srcElement[0];
  if (textInput.value == "clear" || textInput.value == "clear.") {
    clearMessages();
    textInput.value = "";
    textInput.focus();
    return;
  }
  prepareMsg();
});

function clearMessages() {
  let messages = message_container.querySelectorAll(".message_holder");
  console.log(messages);
  messages.forEach((elem) => {
    message_container.removeChild(elem);
  });
}

function prepareMsg() {
  let messageContent = document.querySelector("#msgText");
  messages.set(Math.floor(Math.random() * 100), {
    user: "person",
    message: messageContent.value,
  });
  renderMsg({ user: "person", message: messageContent.value });
  sendMsg({ user: "person", message: messageContent.value });
  messageContent.value = "";
}
document.addEventListener("keyup", (e) => {
  if (e.key == "d") {
  }
  // console.log(messages);
});

async function sendMsg(message) {
  let response = await fetch(`http://127.0.0.1:5000/${message.message}`);
  let data = response.ok
    ? await response.json()
    : { message: "there is some issue on our end" };
  // let data = await response.json();
  renderMsg({ user: "machine", message: data.message });
}

function renderMsg(message) {
  let message_holder = document.createElement("div");
  message_holder.classList.add("message_holder");

  let alinger = document.createElement("div");
  alinger.classList.add("alinger");
  if (message.user == "machine") alinger.classList.add("robot-aligner");

  let avatar = document.createElement("div");
  avatar.classList.add("avatar");
  if (message.user == "person") avatar.classList.add("iconUser");
  console.log(avatar);

  let bubble = document.createElement("div");
  bubble.classList.add("bubble");
  if (message.user == "person") bubble.classList.add("user");
  bubble.textContent = message.message;

  alinger.appendChild(avatar);
  alinger.appendChild(bubble);

  message_holder.appendChild(alinger);
  message_container.insertBefore(message_holder, anchor);
}

// scroll to bottom
const config = { childList: true };
const callback = function (mutationList, observer) {
  console.log("somethin happening");
  for (let mutation of mutationList) {
    if (mutation.type == "childList") {
      message_container.scrollTo(0, document.body.scrollHeight);
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(message_container, config);

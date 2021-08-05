const socket = io();

let name;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");

let sendMessage = (msg) => {
    let matter = {
        user: name,
        message: msg.trim()
    }
    //Append the message to message area
    appendMessage(matter, "outgoing");
    textarea.value = "";
    scroll();

    //Send to server
    socket.emit("message", matter);
}

let appendMessage = (matter, type) => {
    let main_div = document.createElement("div");
    let className = type;

    main_div.classList.add(className, "message");

    let users_markup = `
    <h4>${matter.user}</h4>
    <p>${matter.message}</p>
    `;

    main_div.innerHTML = users_markup;
    messageArea.appendChild(main_div);
}

do{
    name = prompt("Hey! Enter your name here ");
} while(!name)

textarea.addEventListener("keyup", (e) => {
    if(e.key === "Enter") {
        sendMessage(e.target.value);
    }
});

let scroll = () => {
    messageArea.scrollTop = messageArea.scrollHeight;
}

//Recieve messages
socket.on("message", (data) => {
    appendMessage(data,"incoming");
    scroll();
});
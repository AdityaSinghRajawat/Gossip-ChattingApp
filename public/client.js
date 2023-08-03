const socket = io();

let nam;
const textarea = document.querySelector('#textarea')
const container = document.querySelector('.container');
var audio = new Audio('/ding.mp3');

do {
    nam = prompt("Please enter your name");
} while (!nam)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
});

function sendMessage(message) {
    const msg = {
        user: nam,
        message: message.trim()
    }
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom();
    socket.emit('message', msg)
}

//Send to Server


function appendMessage(msg, type) {
    const mainDiv = document.createElement('div');
    const className = type;

    mainDiv.classList.add(className, 'message');

    const markup = `
    <h4>${msg.user}</h4><br>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;

    container.appendChild(mainDiv);

    if (type == 'incoming') {
        audio.play();
    }
}

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
});

function scrollToBottom() {
    container.scrollTop = container.scrollHeight;
}
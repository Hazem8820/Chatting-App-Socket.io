///////////////////////////////////// Var /////////////////////////////////////
const nameInput = document.getElementById("input_name")
const nameSelc = document.getElementById("nameSelc")
const redAlert = document.getElementById("redAlert")
const headTag = document.getElementById("headTag")
const deleteButton = document.getElementById("deleteButton")
const messageInput = document.getElementById("messageInput")
const chatForm = document.querySelector(".chat-input-form")
const messageRow = document.getElementById("messageRow")
const nameDiv = document.getElementById("name_div")
const chatDiv = document.getElementById("chat_div")
const nameButton = document.getElementById("button_name")
const date = new Date()
const dateNow = date.getHours() + ":" + date.getMinutes()
///////////////////////////////////////////////////////////////////////////////
const socket = io("http://localhost:3000", { autoConnect: false })

nameButton.addEventListener('click', () => {
    if (nameInput.value === '') {
        redAlert.classList.remove('d-none')
        redAlert.innerText = "Name Is Required"
    } else {
        const nameValue = nameInput.value
        nameSelc.innerText = nameInput.value
        headTag.innerText = nameInput.value + ' ' + "Chatting...."
        socket.connect()
        socket.auth = { nameValue }
        nameDiv.classList.add('d-none')
        chatDiv.classList.remove('d-none')
    }
})

const message = (msg) => `<div class="message ${msg.from == nameInput.value ? "blue-bg" : "gray-bg"}">
    <div id="messageName" class="message-sender">${msg.from}</div>
    <div id="messageContent" class="message-text">${msg.msg}</div>
    <div id="messageDate" class="message-timestamp">${date.getHours() > 12 ? dateNow + " PM " : dateNow + " AM "}</div>
    </div>
`

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    socket.emit('clientToServer', messageInput.value)
    messageInput.value = ''
})

socket.on('serverToClient', (msg) => {
    messageRow.innerHTML += message(msg)
    messageRow.scrollTop = messageRow.scrollHeight
})

deleteButton.addEventListener("click", () => {
    messageRow.innerHTML = null
})




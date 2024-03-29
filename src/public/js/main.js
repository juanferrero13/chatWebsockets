//Creamos una instancia de socket.io del lado del cliente
const socket = io()

//Creamos una variable para guardar el nombre de usuario
let user
const chatBox = document.getElementById("chatBox")

//Utilizamos sweetAlert para el mensaje de bienvenida
Swal.fire({
    title: "Hola, identificate",
    input: "text",
    text: "Ingresa un nombre de usuario para identificarte en el chat",
    inputValidator: (value) => {
        return !value && "Necesitas ingresar un nombre para continuar"
    },
    //Deshabilitamos los clicks por fuera
    allowOutsideClick: false,
}).then(result => {
    user = result.value
})

chatBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            //El metodo trim() nos permite quitar los espacios en blanco del principio y del final de un sting
            //Si el mensaje es > 0, lo enviamos al servidor
            socket.emit("message", { user: user, message: chatBox.value })
            chatBox.value = ""
        }
    }
})

//Listener de mensajes
socket.on("messagesLogs", data => {
    const log = document.getElementById("messagesLogs")
    let messages = []

    data.forEach(message => {
        messages = messages + `${message.user}: ${message.message} <br>`
    })
    log.innerHTML = messages
})
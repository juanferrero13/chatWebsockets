//Importamos y creamos un app express
const express = require("express")
const exphbs = require("express-handlebars")
const socket = require("socket.io")
const app = express()
const PUERTO = 8080

//Middleware para el contenido estatico
app.use(express.static("./src/public"))
//Middleware para el manejo de archivos complejos
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Configuramos Handlebars
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

//Rutas
app.get("/", (req, res) => {
    res.render("index")
})

//Listen
const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el PUERTO ${PUERTO}`)
})

//Guardamos referencia del servidor
//Generamos instancia de socket.io del lado de backend
const io = new socket.Server(httpServer)

let messages = []

//Establecemos la conección
io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado")

    socket.on("message", data => {
        messages.push(data)

        //Emitimos mensaje para el cliente con el array de datos
        io.emit("messagesLogs", messages)
    })
})


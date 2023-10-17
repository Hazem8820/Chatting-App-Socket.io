import { Server } from "socket.io"
import express from "express"
const app = express()
const port = 3000
const server = app.listen(port, () => console.log(`backend is running on port......... ${port}!`))
const io = new Server(server, { cors: "*" }) // create io server
io.use((socket, next) => {
    if (!socket.handshake.auth.nameValue) return next(new Error("Name is Required"))
    socket.userName = socket.handshake.auth.nameValue
    next()
})
io.on("connection", (socket) => {
    socket.on('clientToServer', (msg) => {
        io.emit('serverToClient', { from: socket.userName, msg })
    })
}) // connection
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

/*  Constants
*/
// Server.
const PORT_NUMBER = 3000
const CLIENTS_FOLDER = 'client'
// Messages.
const LISTENING_MSG = `Server is listening on port ${PORT_NUMBER}.`
const NEW_SAT_MSG = 'A new satellite has arrived on the system, welcome '
const SAT_DISC_MSG = 'A Satellite has left the system, farewell '
// Transmission interval.
const TRANSMISSION_INTERVAL = 50
// Signals.
const CON_SIG = 'connection'
const NEW_ID = 'newSatId'
const SEND_DATA = 'dataTransmission'
const DATA_UPDATE = 'updateTransmission'
const DISCONNECTION_SIG = 'disconnect'
const REMOVE_SAT = 'satDisconnection'

/*  Class: App
    @authors: Cédric ABDELBAKI, Yanis KOUIDRI
    @contributors:
    @version: 0.1
*/
class App {    
    /*  Calls methods to create the server and handle its interactions.
    */
    constructor() {
        this.createServer()
        this.configureServer()
        this.startServer()
        this.handleSocketConnection()
    }

    /*  Creates the app, the http server and the socket.io server.
    */
    createServer() {
        this.app = express()
        this.server = http.createServer(this.app)
        this.io = new Server(this.server)
    }

    /*  Makes a folder accessible for the clients.
    */
    configureServer() {
        this.app.use(express.static(CLIENTS_FOLDER))
    }

    /*  Stars the http server.
    */
    startServer() {
        this.server.listen(PORT_NUMBER, () => {
            console.log(LISTENING_MSG)
        })
    }

    /*  Handles interactions with the clients.
    */
    handleSocketConnection() {
        this.satellites = {}
        this.io.on(CON_SIG, (socket) => {
            this.handleNewUsers(socket)
            this.handleSatUpdates(socket)
            this.handleSatDisconnection(socket)
        })
    }

    /*  Handles the connection of a new satellite.
    */
    handleNewUsers(socket) {
        console.log(NEW_SAT_MSG + socket.id)
        this.satellites[socket.id] = {}
        socket.emit(NEW_ID, socket.id)
    }

    /*  Handles data reception and clients updates.
    */
    handleSatUpdates(socket) {
        socket.on(SEND_DATA, data => {
            if (this.satellites[socket.id]) {
                this.satellites[socket.id].position = data.position
                this.satellites[socket.id].rotation = data.rotation
            }
        })
        setInterval(() => {
            this.io.emit(DATA_UPDATE, this.satellites)
        }, TRANSMISSION_INTERVAL)
    }

    /*  Handles the disconnection of a satellite.
    */
    handleSatDisconnection(socket) {
        socket.on(DISCONNECTION_SIG, () => {
            console.log(SAT_DISC_MSG + socket.id)
            if (this.satellites && this.satellites[socket.id]) {
                delete this.satellites[socket.id]
                this.io.emit(REMOVE_SAT, socket.id)
            }
        })
    }
}

new App()

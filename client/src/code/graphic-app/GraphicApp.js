import { Scene } from './dependencies/three.module.js'
import { Renderer } from './utils/Renderer.js'
import { ModelLoader } from './utils/ModelLoader.js'
import { TextDisplayer } from './utils/TextDisplayer.js'
import { ControlledSat } from './satellites/ControlledSat.js'
import { Composer } from './utils/Composer.js'
import { PlanetarySystem } from './system/PlanetarySystem.js'
import { OtherClientSat } from './satellites/OtherClientSat.js'

/*  Constants
*/
// Celestial bodies data file.
const BODIES_DATA_PATH = '/src/files/graphic-app/bodies.json'
// Transmission interval.
const TRANSMISSION_INTERVAL = 50
// Signals
const NEW_ID = 'newSatId'
const SEND_DATA = 'dataTransmission'
const DATA_UPDATE = 'updateTransmission'
const REMOVE_SAT = 'satDisconnection'

/*  Class: GraphicApplication
    @authors: Cédric ABDELBAKI, Yanis KOUIDRI
    @contributors:
    @version: 0.2
*/
export class GraphicApp {
    /*  Calls methods to run the application, handle network
        interactions and animations.
    */
    constructor() {
        this.initialize()
        this.handleNetworkInteractions()
        this.animate()
    }

    /*  Instantiates client-side objects.
    */
    initialize() {
        this.scene = new Scene()
        this.renderer = new Renderer()
        this.loader = new ModelLoader()
        this.displayer = new TextDisplayer()
        this.satellite = new ControlledSat(
            this.loader,
            this.renderer.domElement,
            this.scene
        )
        this.composer = new Composer(
            this.renderer,
            this.scene,
            this.satellite
        )
        this.system = new PlanetarySystem(
            this.scene,
            BODIES_DATA_PATH
        )
    }

    /*  Handles client-server interactions.
    */
    handleNetworkInteractions() {
        this.socket = io()
        this.satellites = {}
        this.handleConnection()
        this.handleUpdates()
        this.handleDisconnection()
    }

    /*  Gets an id from the server, sets an interval to transmit
        user's satellite position and rotation values.
    */
    handleConnection() {
        // Listens for a new id from the server.
        this.socket.on(NEW_ID, (id) => {
            this.id = id
            // Sets an interval to transmit position and rotation values.
            setInterval(() => {
                this.socket.emit(SEND_DATA, {
                    position: this.satellite.position,
                    rotation: this.satellite.rotation
                })
            }, TRANSMISSION_INTERVAL)
        })
    }

    /*  Creates another client satellite if it does not exists.
        Updates its position and rotation if it exists.
    */
    handleUpdates() {
        // Listens for satellites data updates.
        this.socket.on(DATA_UPDATE, (data) => {
            // Loops on the received dictionnary.
            Object.keys(data).forEach((id) => {
                // Checks if the id is not your own.
                if (id != this.id) {
                    // Creates a client satellite if it doesn't exist.
                    if (!this.satellites[id]) {
                        this.satellites[id] = new OtherClientSat(
                            this.loader,
                            id,
                            this.displayer,
                            this.scene
                        )
                    // Updates values for the client satellite if it exists.
                    } else {
                        // Checks if the client satellite has values for position.
                        if (this.satellites[id].model.position && data[id].position) {
                            // Updates the position values.
                            this.satellites[id].model.position.set(
                                data[id].position.x,
                                data[id].position.y,
                                data[id].position.z
                            )
                        }
                        // Checks if the client satellite has values for rotation.
                        if (this.satellites[id].model.rotation && data[id].rotation) {
                            // Updates the rotation values.
                            this.satellites[id].model.rotation.set(
                                data[id].rotation._x,
                                data[id].rotation._y,
                                data[id].rotation._z
                            )
                        }
                    }
                }
            })
        })
    }

    /*  Removes another client satellite from the scene
        when its id is received.
    */
    handleDisconnection() {
        // Listens for a client satellite disconnection.
        this.socket.on(REMOVE_SAT, (id) => {
            // Removes the client satellite from the 3D scene.
            this.scene.remove(
                this.scene.getObjectByName(id)
            )
            // Deletes the client from the satellites dictionnary.
            delete this.satellites[id]
        })
    }

    /*  Handles 3D objects animations.
    */
    animate() {
        const animate = () => { 
            requestAnimationFrame(animate)
            // Checks if your own satellite exists.
            if (this.satellite) {
                // Renders the scene.
                this.renderer.render(
                    this.scene,
                    this.satellite
                )
                // Renders the glowing star effect.
                this.composer.render()
                // Updates your own satellite controls.
                this.satellite.controls.update(1)
            }
            // Loops on the planets and moon to handle their rotations and orbits.
            for (const planetOrMoon in this.system.planetsAndMoons) {
                this.system.planetsAndMoons[planetOrMoon].update()
            }
        }
        animate()
    }
}

new GraphicApp()

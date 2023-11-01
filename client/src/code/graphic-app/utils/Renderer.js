import { WebGLRenderer } from '../dependencies/three.module.js'

/*  Constants
*/
// Window.
const WIN_WIDTH = window.innerWidth
const WIN_HEIGHT = window.innerHeight

/*  Class: Renderer
    @authors: Cédric ABDELBAKI, Yanis KOUIDRI
    @contributors:
    @version: 0.1
*/
export class Renderer extends WebGLRenderer {
    /*  Creates and configures the renderer.
    */
    constructor() {
        super()
        this.configure()
        this.appendDomElement()
    }

    /*  Sets the renderer size.
    */
    configure() {
        this.setSize(WIN_WIDTH, WIN_HEIGHT)
    }

    /*  Makes the content visible.
    */
    appendDomElement() {
        document.body.appendChild(this.domElement)
    }
}

import { PerspectiveCamera } from '../dependencies/three.module.js'
import { FlyControls } from '../dependencies/controls/FlyControls.js'

/*  Constants
*/
// Camera.
const DRAG_TO_LOOK = true
const CAM_FOV = 50
const WIN_WIDTH = window.innerWidth
const WIN_HEIGHT = window.innerHeight
const CAM_NEAR = 0.1
const CAM_FAR = 15000
const CAM_POS = {x:0, y:600, z:1500}
const CAM_ROT = {x:11*Math.PI/6, y:0, z:0}
// Satellite.
const SAT_PATH = '/src/assets/graphic-app/models/cassini_huygens.glb'
const SAT_SCALE = 0.001
const SAT_POS = {x: 0, y: -0.1, z: -0.7}
const SAT_ROT = {x: Math.PI/8, y: 0, z: 0}
// Controls.
const ROLL_SPEED = 0.02
const MOV_SPEED = 0.5

/*  Class: ControlledSat
    @authors: Cédric ABDELBAKI, Yanis KOUIDRI
    @contributors:
    @version: 0.1
*/
export class ControlledSat extends PerspectiveCamera {
    /*  Creates an object that represents the satellite controlled by the user.
    */
    constructor(modelLoader, domElement, scene) {
        super(CAM_FOV, WIN_WIDTH/WIN_HEIGHT, CAM_NEAR, CAM_FAR)
        this.setSatPosition()
        this.loadSatModel(modelLoader)
        this.setSatControls(domElement)
        scene.add(this)
    }

    /*  Sets the controlled satellite position.
    */
    setSatPosition() {
        this.position.set(CAM_POS.x, CAM_POS.y, CAM_POS.z)
        this.rotation.set(CAM_ROT.x, CAM_ROT.y, CAM_ROT.z)
    }

    /*  Loads the 3D model and adds it to the camera.
    */
    loadSatModel(modelLoader) {
        this.add(modelLoader.loadModel(SAT_PATH, SAT_SCALE, SAT_POS, SAT_ROT))
    }

    /*  Adds a FlyControls controller to the camera.
    */
    setSatControls(domElement) {
        this.controls = new FlyControls(this, domElement)
        this.controls.dragToLook = DRAG_TO_LOOK
        this.controls.rollSpeed = ROLL_SPEED
        this.controls.movementSpeed = MOV_SPEED
    }
}

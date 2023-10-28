/*  Constants
*/
// Other users satellites data for model creation.
const SAT_PATH = '/src/assets/graphic-app/models/cassini_huygens.glb'
const SAT_SCALE = 0.01
const SAT_POS = {x: 0, y: -1, z: -7}
const SAT_ROT = {x: Math.PI/8, y: 0, z: 0}
// Text.
const TEXT_SIZE = 1
const TEXT_THICKNESS = 0
const TEXT_COLOR = 0xFFFFFF
const TEXT_POSITION = {x: -7.5, y: 2, z:-5}


/*  Class: OtherClientSat
    @authors: Cédric ABDELBAKI, Yanis KOUIDRI
    @contributors:
    @version: 0.2
*/
export class OtherClientSat {
    /*  Creates an object that represents other peoples satellites.
    */
    constructor(modelLoader, name, displayer, scene) {
        this.model = this.loadModel(modelLoader)
        this.model.name = name
        this.displayId(displayer, name)
        scene.add(this.model)
    }

    /*  Loads and returns the satellite 3D model.
    */
    loadModel(modelLoader) {
        return modelLoader.loadModel(SAT_PATH, SAT_SCALE, SAT_POS, SAT_ROT)
    }

    displayId(displayer, name) {
        displayer.displayText(
            this.model,
            name,
            TEXT_SIZE,
            TEXT_THICKNESS,
            TEXT_COLOR,
            TEXT_POSITION
        )
    }
}

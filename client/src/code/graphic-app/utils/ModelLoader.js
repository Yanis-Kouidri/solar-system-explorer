import { GLTFLoader } from '../dependencies/loaders/GLTFLoader.js'
import { Group } from '../dependencies/three.module.js'

/*  Class: ModelLoader
    @authors: Cédric ABDELBAKI, Yanis KOUIDRI
    @contributors:
    @version: 0.1
*/
export class ModelLoader extends GLTFLoader {
    /*  Creates a ModelLoader to share between classes that needs to create 3D objects.
    */
    constructor() {
        super()
    }

    /*  Loads a 3D model, adds it to a group that is returned.
    */
    loadModel(modelPath, scale, pos, rot) {
        let group = new Group()
        this.load(modelPath, (gtlf) => {
            const model = gtlf.scene
            model.scale.set(scale, scale, scale)
            model.position.set(pos.x, pos.y, pos.z)
            model.rotation.set(rot.x, rot.y, rot.z)
            group.add(model)
        })
       return group
    }
}

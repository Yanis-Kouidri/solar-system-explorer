import { Mesh } from '../dependencies/three.module.js'
import { SphereGeometry } from '../dependencies/three.module.js'
import { MeshPhongMaterial } from '../dependencies/three.module.js'

/*  Constants
*/
// Sphere geometry.
const GEOMETRY_SEGMENTS = 256

/*  Class: CelestialBody
    @authors: Cédric ABDELBAKI, Yanis KOUIDRI
    @contributors:
    @version: 0.1
*/
export class CelestialBody extends Mesh {
    /*  Calls the mesh constructor, the method to create
        the object and adds it to its parent.
    */
    constructor(data, textureLoader, parent) {
        super()
        this.data = data
        this.setMesh(textureLoader, data)
        parent.add(this)
    }

    /*  Creates the body 3D object.
    */
    setMesh(textureLoader) {
        this.geometry = new SphereGeometry(
            this.data.radius,
            GEOMETRY_SEGMENTS,
            GEOMETRY_SEGMENTS
        )
        this.geometry.needsUpdate = true
        this.material = new MeshPhongMaterial({
            map: textureLoader.load(this.data.texturePath)
        })
        this.material.needsUpdate = true
        this.position.set(
            this.data.position.x,
            this.data.position.y,
            this.data.position.z
        )
    }
}

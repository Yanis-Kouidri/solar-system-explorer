import { Mesh } from '../dependencies/three.module.js'
import { SphereGeometry } from '../dependencies/three.module.js'
import { MeshBasicMaterial } from '../dependencies/three.module.js'
import { BackSide } from '../dependencies/three.module.js'

/*  Constants
*/
// Sphere geometry.
const GEOMETRY_SEGMENTS = 256

/*  Class: SystemBackground
    @authors: Cédric ABDELBAKI, Yanis KOUIDRI
    @contributors:
    @version: 0.1
*/
export class SystemBackground extends Mesh {
    /*  Creates a sphere geometry and displays the background texture in the inside of it.
    */
    constructor(radius, textureLoader, texturePath, parent) {
        const geometry = new SphereGeometry(
            radius,
            GEOMETRY_SEGMENTS,
            GEOMETRY_SEGMENTS
        )
        const material = new MeshBasicMaterial({
            map: textureLoader.load(texturePath),
            side: BackSide
        })
        super(geometry, material)
        parent.add(this)
    }
}

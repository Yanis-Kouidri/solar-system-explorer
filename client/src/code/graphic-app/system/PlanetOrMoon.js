import { CelestialBody } from './CelestialBody.js'
import { TorusGeometry } from '../dependencies/three.module.js'
import { MeshBasicMaterial } from '../dependencies/three.module.js'
import { Mesh } from '../dependencies/three.module.js'
import { Vector3 } from '../dependencies/three.module.js'

/*  Constants
*/
// Orbit line.
const LINE_THICKNESS = 2
const LINE_SEGMENTS = 256
const LINE_COLOR = 0x7fb3d5
const LINE_OPACITY = 0.3
const LINE_ROTATION = Math.PI / 2
// Orbit rotation.
const ORBIT_VECTOR = {x: 0, y: 1, z: 0}

/*  Class: PlanetOrMoon
    @authors: Cédric ABDELBAKI, Yanis KOUIDRI
    @contributors:
    @version: 0.1
*/
export class PlanetOrMoon extends CelestialBody {
    /*  Calls the CelestialBody class constructor then calls the methods to draw orbit lines.
    */
    constructor(data, textureLoader, parent) {
        super(data, textureLoader, parent)
        this.drawOrbitLines(parent)
    }

    /*  Draws and displays the body orbit line.
    */
    drawOrbitLines(parent) {
        const geometry = new TorusGeometry(
            this.position.x,
            LINE_THICKNESS,
            LINE_SEGMENTS,
            LINE_SEGMENTS
        )
        const material = new MeshBasicMaterial({
            color: LINE_COLOR,
            transparent: true,
            opacity: LINE_OPACITY
        })
        const mesh = new Mesh(geometry, material)
        mesh.rotateX(LINE_ROTATION)
        parent.add(mesh)
    }

    /*  Updates the body rotation on itself.
    */
    setRotation() {
        this.rotation.y += this.data.rotationSpeed
    }

    /*  Updates the body rotation arround the center of its parent.
    */
    setOrbit() {
        this.position.applyAxisAngle(
            new Vector3(
                ORBIT_VECTOR.x,
                ORBIT_VECTOR.y,
                ORBIT_VECTOR.z
            ),
            this.data.orbitSpeed
        )
    }

    /*  Calls methods to handle rotations and orbits.
        Has to be called from the animation loop.
    */
    update() {
        this.setRotation()
        this.setOrbit()
    }
}

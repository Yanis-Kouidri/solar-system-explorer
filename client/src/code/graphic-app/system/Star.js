import { CelestialBody } from './CelestialBody.js'
import { PointLight } from '../dependencies/three.module.js'
import { Color } from '../dependencies/three.module.js'

/*  Constants
*/
// Light.
const LIGHT_COLOR = 0xFFFFFF
const LIGHT_INTENSITY = 50
const LIGHT_DISTANCE = 0
const LIGHT_DECAY = 0.6
// Glow.
const GLOW_COLOR = 0xfad7a0
const GLOW_INTENSITY = 1.8

/*  Class: Star
    @authors: Cédric ABDELBAKI, Yanis KOUIDRI
    @contributors:
    @version: 0.1
*/
export class Star extends CelestialBody {
    /*  Calls the inherited class constructor then calls the methods
        to make the star emit light with a glow effect.
    */
    constructor(data, textureLoader, parent) {
        super(data, textureLoader, parent)
        this.setLight()
        this.setGlow()
    }

    /*  Creates a multidirectional light to simulate the star light.
    */
    setLight() {
        const light = new PointLight(
            LIGHT_COLOR,
            LIGHT_INTENSITY,
            LIGHT_DISTANCE,
            LIGHT_DECAY
        )
        this.add(light)
    }

    /*  Sets the glow effect.
    */
    setGlow() {
        this.material.emissive = new Color(GLOW_COLOR)
        this.material.emissiveMap = this.material.map
        this.material.emissiveIntensity = GLOW_INTENSITY
        this.material.needsUpdate = true
    }
}

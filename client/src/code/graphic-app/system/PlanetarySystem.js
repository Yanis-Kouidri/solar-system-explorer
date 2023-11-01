import { TextureLoader } from '../dependencies/three.module.js'
import { SystemBackground } from './SystemBackground.js'
import { Star } from './Star.js'
import { PlanetOrMoon } from './PlanetOrMoon.js'

/*  Constants
*/
// Background.
const BACKGROUND_RADIUS = 10000
const BACKGROUND_TEXTURE = '/src/assets/graphic-app/textures/8k_stars.jpg'
// Distance and radius multiplication factors.
const BODY_RADIUS_MULTIPLIER = 4
const BODY_DISTANCE_MULTIPLIER = 4

/*  Class: PlanetarySystem
    @authors: Cédric ABDELBAKI, Yanis KOUIDRI
    @contributors:
    @version: 0.1
*/
export class PlanetarySystem {
    /*  Sets planets and moons dictionnary, sets the system background
        and calls the method to create the bodies.
    */
    constructor(scene, json) {
        this.planetsAndMoons = {}
        const loader = new TextureLoader()
        this.setBackground(loader, scene)
        this.createBodies(json, loader, scene)
    }

    /*  Creates the planetary system background object.
    */
    setBackground(loader, scene) {
        const background = new SystemBackground(
            BACKGROUND_RADIUS,
            loader,
            BACKGROUND_TEXTURE,
            scene,
        ) 
    }

    /*  Gets data from the json file to create the bodies 3D objects.
    */
    async createBodies(json, loader, scene) {
        const response = await fetch(json)
        const bodiesData = await response.json()
        for (const bodyData of bodiesData) {
            let body
            bodyData.radius *= BODY_RADIUS_MULTIPLIER
            bodyData.position.x *= BODY_DISTANCE_MULTIPLIER
            switch (bodyData.type) {
                case 'Star':
                    body = new Star(bodyData, loader, scene)
                    break
                case 'PlanetOrMoon':
                    body = new PlanetOrMoon(bodyData, loader, scene)
                    this.planetsAndMoons[bodyData.name] = body
                    break
            }
        }
    }
}

import { EffectComposer } from '../dependencies/postprocessing/EffectComposer.js'
import { UnrealBloomPass } from '../dependencies/postprocessing/UnrealBloomPass.js'
import { RenderPass } from '../dependencies/postprocessing/RenderPass.js'

/*  Constants
*/
// Glow effect.
const GLOW_STRENGTH = 1
const GLOW_RADIUS = 1
const GLOW_THRESHOLD = 0.01

/*  Class: Composer
    @authors: Cédric ABDELBAKI, Yanis KOUIDRI
    @contributors:
    @version: 0.1
*/
export class Composer extends EffectComposer {
    /*  Creates the glow effect and calls methods for configuration.
    */
    constructor(renderer, scene, camera) {
        super(renderer)
        const glowEffect = this.setGlowEffect()
        this.configureComposer(scene, camera, glowEffect)
    }

    /*  Creates the glow effect.
    */
    setGlowEffect() {
        const glowEffect = new UnrealBloomPass()
        glowEffect.strength = GLOW_STRENGTH
        glowEffect.radius = GLOW_RADIUS
        glowEffect.threshold = GLOW_THRESHOLD
        return glowEffect
    }

    /*  Configures the composer.
    */
    configureComposer(scene, camera, glowEffect) {
        this.addPass(new RenderPass(scene, camera))
        this.addPass(glowEffect)
    }
}

import { FontLoader } from '../dependencies/loaders/FontLoader.js'
import { TextGeometry } from '../dependencies/geometries/TextGeometry.js'
import { MeshBasicMaterial } from '../dependencies/three.module.js'
import { Mesh } from '../dependencies/three.module.js'

/*  Constants:
*/
// Font.
const APP_FONT = '/src/assets/graphic-app/fonts/helvetiker_regular.typeface.json'

/*  Class: TextDisplayer
    @authors: Cédric ABDELBAKI
    @contributors:
    @version: 0.1
*/
export class TextDisplayer extends FontLoader {
    /*  Creates a TextDisplayer to add text close to 3D models.
    */
    constructor() {
        super()
    }

    /*  Loads a font, creates a mesh for the text,
        adds it to a group (planet, satellite...).
    */
    displayText(group, text, size, height, color, position) {
        this.load(APP_FONT, function (font) {
            const geometry = new TextGeometry(text, {
                font: font,
                size: size,
                height: height,

            })
            const material = new MeshBasicMaterial({
                color: color,
            })
            const mesh = new Mesh(geometry, material)
            mesh.position.set(
                position.x,
                position.y,
                position.z
            )
            group.add(mesh)
        })
    }
}

import { GraphicApp } from './graphic-app/GraphicApp.js'
import Sidebar from './interface/Sidebar.js'

/*  File: Main
    @authors: Cédric ABDELBAKI, Yanis KOUIDRI, Alban PERSONNAZ
    @contributors:
    @version: 0.1
*/
const socket = io()
// Creates a new Vue.js application.
new Vue({
    el: '#app',
    components: {
        Sidebar,
    },
    data: {
        socket: socket,
    },
    template: `
        <div>
            <sidebar></sidebar>
        </div>
    `,
    mounted() {
        // Creates a new 3D representation of the solar system.
        const app = new GraphicApp(this.socket)
    }
});

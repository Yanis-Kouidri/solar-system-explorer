/*  Component: Sidebar
    @authors: Cédric ABDELBAKI, Yanis KOUIDRI, Alban PERSONNAZ
    @contributors:
    @version: 0.1
*/
export default {
  /*  Initializes the component data (clients, position and bodies).
  */
  data() {
    return {
      currentlyOnline: [],
      currentPosition: { x: 0, y: 0, z: 0 },
      celestialBodies: [
        {
          name: "THE SUN",
          image: "/src/assets/interface/pictures/sun.png",
          diameter: "1 392 684 km",
        },
        {
          name: "MERCURY",
          image: "/src/assets/interface/pictures/mercury.png",
          diameter: "4 879 km",
        },
        {
          name: "VENUS",
          image: "/src/assets/interface/pictures/venus.png",
          diameter: "12 104 km",
        },
        {
          name: "EARTH",
          image: "/src/assets/interface/pictures/earth.png",
          diameter: "12 742 km",
        },
        {
          name: "MARS",
          image: "/src/assets/interface/pictures/mars.png",
          diameter: "6 779 km",
        },
        {
          name: "JUPITER",
          image: "/src/assets/interface/pictures/jupiter.png",
          diameter: "139 820 km",
        },
        {
          name: "SATURN",
          image: "/src/assets/interface/pictures/saturn.png",
          diameter: "116 460 km",
        },
        {
          name: "URANUS",
          image: "/src/assets/interface/pictures/uranus.png",
          diameter: "50 724 km",
        },
        {
          name: "NEPTUNE",
          image: "/src/assets/interface/pictures/neptune.png",
          diameter: "49 244 km",
        },
      ],
    }
  },

  /*  A hook to listen on socket interactions to update the component data.
  */
  mounted() {
    this.$root.socket.on('updateTransmission', (data) => {
      this.currentlyOnline = Object.keys(data);
      const id = this.$root.socket.id;
      if (id in data && data[id].position) {
        this.currentPosition = data[id].position;
      }
    })
  },

  /*  The html code for the component.
  */
  template: `
    <div class="sidebar-container">
      <h2 class="title">CURRENTLY ONLINE</h2>
      <ul style="list-style-type: none; padding: 0; margin: 0;">
        <li v-for="id in currentlyOnline" :key="id" style="margin-bottom: 5px;">
          <img src="/src/assets/interface/icons/satellite.svg" alt="sat-icon" style="width: 20px; height: 20px; margin-right: 5px;">
          {{ id }}
        </li>
      </ul>
      <h2 class="title">CURRENT POSITION</h2>
      <p>X: {{ currentPosition.x }}</p>
      <p>Y: {{ currentPosition.y }}</p>
      <p>Z: {{ currentPosition.z }}</p>
      <h2 class="title">BODIES DESCRIPTION</h2>
      <div v-for="body in celestialBodies" :key="body.name" class="celestial-body">
        <h3 class="body">{{ body.name }}</h3>
        <div class="picture-container">
          <img :src="body.image" :alt="body.name" class="picture">
        </div>
        <p>NAME: {{ body.name }}</p>
        <p>DIAMETER: {{ body.diameter }}</p>
      </div>
    </div>
  `,
}

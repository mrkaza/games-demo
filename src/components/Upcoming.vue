<template>
  <div class="popular">
    <hooper group="group1" class="pozadina" :vertical="false"
        :autoPlay="true" :playSpeed="5000" :wheelControl="false"
        :mouseDrag="false"
        :touchDrag="false" :keysControl="false"
    >
        <slide class="igrica-poz" v-for="(igrica,index) in upcoming" :key="index">
            <img class="slika-poz" :src="igrica.background_image" alt="">
            <div class="informacije">
                <h3>{{igrica.name}}</h3>
                <div class="zanr">
                    <p class="zanr-krug" v-for="(zanr,index) in igrica.genres" :key="index">
                    {{zanr.name}}
                    </p>
                </div>
                <p class="more">EXPLORE MORE GAMES</p>
                
            </div>
        </slide>
    </hooper>
    <div class="navigacija">
        <hooper group="group1" class="hoopnav" :itemsToShow="pokaziSlides" 
        :centerMode="true" :vertical="false" 
        :wheelControl="false"
        :mouseDrag="false"
        :touchDrag="false" :keysControl="false">
            <slide class="slikice" v-for="(igrica,index) in upcoming" :key="index">
                <img class="slika-poz slika-ispred" :src="igrica.background_image" alt="">
                <router-link class="na-detalje" :to="`/game/${igrica.id}`"></router-link>
            </slide>
        </hooper>
    </div>


  </div>


</template>

<script>
import { Hooper, Slide } from 'hooper';
import 'hooper/dist/hooper.css';



export default {
  name: 'Upcoming',
  components: {
      Hooper,
      Slide,

  },
  data() {
      return {
          upcoming: [],
          datum: '',
          mjesec: '',
          dan: '',
          mjesecvise: '',
          danvise: '',
          platforme: [],
          pokaziSlides: 5

      }
  },
  methods: {

  },
  created() {
      this.datum = new Date()
      this.mjesec = String(this.datum.getMonth() + 1).padStart(2, '0')
      this.dan = String(this.datum.getDate()).padStart(2, '0')
      this.mjesecvise = 0 +String(Number(this.mjesec) +2 )
      this.danvise = 0 + String(Number(this.dan) -3)

    this.axios.get('https://api.rawg.io/api/games?dates=2020-05-29,2020-12-31&ordering=-added').then(response => {
        this.upcoming = response.data.results.slice(0,5)

    })

    if(screen.width <= 1024) {
        this.pokaziSlides = 3
    }
    if( screen.width <= 600) {
        this.pokaziSlides = 1.2
    }
  },
  mounted() {
      this.axios.get('https://api.rawg.io/api/platforms').then(response =>{
          this.platforme = response.data

      })

  }

//   `https://api.rawg.io/api/games?dates=2020-${this.mjesec}-${this.dan},2020-${this.mjesecvise}-${this.danvise}&ordering=-added`
}
</script>
<style scoped>

  .popular {
      color:white;  
      width:100%;
      height: 100%;
  }
  .pozadina {
      height: 100%;
      width:100%;
      background:black;
  }
  .navigacija {
      position:absolute;
      bottom:0;
      left:0;
      width:100%;
      height: 300px;
  }
  .slika-poz {
      width:100%;
      height: 100%;
      object-fit: cover;
      opacity:0.6;
      object-position: center;
  }
  .slika-ispred {
      opacity:1;
        box-shadow: 5px 5px 15px black;
  }
  .slikice {
      padding:20px;
      padding-bottom:75px;
      position:relative;

  }
  .na-detalje {
      position:absolute;
      left:0;
      top:0;
      width:100%;
      height: 100%;
  }
  .hoopnav {
      height: 100%;
  }
  .navigacija .is-current {
      transform:scale(1.2);
      padding:30px;
      padding-bottom:75px
  }
  .navigacija .is-current img {
      border:1px solid white;
      
  }
  .hooper {
      outline:none;
  }
  .igrica-poz {
      position:relative;
      width:100%;
      height: 100%;
  }
  .informacije {
      position:absolute;
      top:100px;
      left:0;
      width:100%;
  }
  .informacije h3 {
      font-weight: bold;
      letter-spacing: 2px;
      text-shadow: 5px 5px 5px black;
      padding:0 25%
  }
  .zanr {
      display:flex;
      width:100%;
      justify-content: center;
  }
  .zanr-krug {
      background:#404040;
      margin:10px;
      padding:5px 10px;
      border-radius: 15px;
      box-shadow: 3px 3px 5px black;
      letter-spacing: 2px;
      text-transform: uppercase;
      font-size:11px
  }
  .more {
      background:#CA3E47;
      width:250px;
      margin:30px auto;
      padding:10px 10px;
      letter-spacing: 2px;
      font-weight: bold;
      box-shadow:5px 5px 10px black;
  }



</style>
<template>
  <div class="popular">
      <div class="tekst">
          <p class="trending">Top Rated games</p>
          <!-- <p class="seeall">see all</p> -->
      </div>
      <swiper class="exswiper" :options="swiperOption">
          <swiper-slide v-for="(game,index) in exPopularne" :key="index">
              <img class="slicica" :src="game.background_image" alt="">
              <div class="sjena">
                  <div class="detalji">
                      <p class="ime">{{game.name}}</p>
                      <router-link class="more" :to="`/game/${game.id}`">...</router-link>
                  </div>
              </div>
          </swiper-slide>
      </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
    components: {
        Swiper,
        SwiperSlide
    },
    directives: {
        swiper: directive
    },
    data() {
        return {
            datum: '',
            mjesec: '',
            dan: '',
            mjesecvise:'',
            exPopularne: [],
            swiperOption: {
                slidesPerView:6,
                spaceBetween: 20,
                grabCursor: true,
            }
        }
    },
    created() {
      this.datum = new Date()
      this.mjesec = String(this.datum.getMonth() + 1).padStart(2, '0')
      this.dan = String(this.datum.getDate()).padStart(2, '0')
      this.mjesecvise = 0 +String(Number(this.mjesec) -1 )

    this.axios.get(`https://api.rawg.io/api/games?dates=2010-01-01,2020-${this.mjesec}-${this.dan}&ordering=-rating`).then(response => {
        this.exPopularne = response.data.results.slice(0,10)
        console.log(this.exPopularne)
        
    })


    if(screen.width <= 1024) {
        this.swiperOption.slidesPerView = 4
    } 
    if (screen.width <= 600) {
        console.log(screen.width)
        this.swiperOption.slidesPerView = 1.2
    }
  },
}
</script>

<style scoped>
    .popular {
        margin:0 20px;
        /* box-shadow: 10px 10px 15px black; */
        /* background:black; */
        padding-bottom:30px;
    }
    .igrica {
        width:100px;
    }
    .exswiper {
        height: 250px;
        overflow: visible;
    }
    .slicica {
        width:100%;
        height:100%;
        object-fit: cover;
        object-position: top;
    }
    .sjena {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height: 100%;
        background:black;
        background: linear-gradient( rgba(0,0,0,0.22452731092436973) 12%, rgba(0,0,0,0.5746673669467788) 44%, rgba(0,0,0,1) 76%, rgba(0,0,0,1) 100%);
    }
    .detalji {
        position:absolute;
        bottom:0;
        left:0;
        width:100%
    }
    .detalji p {
        margin:5px 0;
        position:relative;
    }
    .more {
        text-align:right;
        font-size:35px;
        text-decoration:none;
        color:#CA3E47;
        position:absolute;
        bottom:0;
        right:0;
    }
    .ime {
        padding-bottom:20px
    }

    .swiper-slide {
        position:relative;
        width: 60%;
        /* border:1px solid rgba(255,255,255,0.3); */
        height: 99%;
        box-shadow: 3px 3px 5px rgba(0,0,0,1),
                    -3px -3px 3px rgba(255,255,255,0.2);
        
    }
    .swiper-slide:nth-child(2n) {
      width: 40%;
    }
    .swiper-slide:nth-child(3n) {
      width: 20%;
    }

    .tekst {
        display:flex;
        justify-content: space-between ;
        padding:20px 0
    }
    .trending {
        align-items: flex-end;
    }
</style>
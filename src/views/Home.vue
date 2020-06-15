<template>
  <div class="home">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>
        <Popular></Popular>
      </swiper-slide>
      <swiper-slide>
        <Upcoming></Upcoming>
      </swiper-slide>
      <swiper-slide>
        <Toprated></Toprated>
      </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
// @ is an alias to /src
import Popular from '../components/Popular'
import Upcoming from '../components/Upcoming'
import Toprated from '../components/Toprated'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'


export default {
  name: 'Home',
  components: {
    Popular,
    Upcoming,
    Toprated,
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  data() {
    return {
      swiperOption: {
        direction:'vertical',
        mousewheel: true,
        pagination: {
          el: '.swiper-pagination',
          clickable:true,
          type:'progressbar',
        }
      }
    }
  },
  mounted() {
    this.axios.get('https://api.rawg.io/api/platforms').then(response => {
      console.log(response)
    })
  }
}
</script>

<style scoped>
  .home {
    width:100vw;
    height: 100vh;
    background:black
  }
  .home-scroll {
    height: 100%;
    width:100%;
  }
.swiper {
  height: 100%;
}
.swiper-slide {
  height: 100%;
}
.swiper-pagination {
  right:0;
  background-color:rgba(255,255,255,0.5)
}
.swiper-pagination-progressbar-fill {
  background-color:red;
}
</style>

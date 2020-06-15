<template>
  <div class="about">
    <div class="slija" v-bind:style="{ 'background-image': 'url(' + image + ')' }">
      <!-- <img :src="image" alt="" class="image"> -->
      <div class="shadow">
        <div class="name">
          <h1>{{details.name}}</h1>
          <div class="platforms">
            <p class="plat" v-for="(platform,index) in platforms" :key="index">{{platform.platform.name}}</p>
          </div>
          <div class="genres">
            <p class="s-genre" v-for="(genre,index) in genres" :key="index">
              {{genre.name}}
            </p>
          </div>
          <p class="visit" v-if="website">
            <a class="visit-link" :href="website" target="_blank">
            website
          </a>
          </p>
        </div>
      </div>
    </div>
    <div class="more-details">
      <div class="publisher">
        <div class="pub">
          <P class="pub-title">Publishers:</p>
          <div class="list">
            <p v-for="(pub,index) in publishers" :key="index">{{pub.name}}</p>
          </div>
        </div>
        <div class="dev">
          <p  class="pub-title">Developers:</p>
          <div class="list">
            <p v-for="(dev,index) in developers" :key="index"> {{dev.name}}</p>
          </div>
        </div>
      </div>

      <p class="descr">
        {{details.description_raw}}
      </p>
      <div class="stores">
        <p class="where">Where to buy:</p>
        <p class="store" v-for="(store,index) in stores" :key="index"><a class="store-link" 
        :href="store.url" targer="_blank"
        >{{store.store.name}}</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.params.id,
            details: [],
            clip: '',
            image: '',
            genres: [],
            platforms: [],
            developers: [],
            publishers: [],
            website: '',
            stores: []
        }
    },
    created() {
        console.log(this.id)
        this.axios.get(`https://api.rawg.io/api/games/${this.id}`).then(response => {
          this.details = response.data
          // this.clip = this.details.clip.clip
          this.image = this.details.background_image
          this.genres = this.details.genres
          this.platforms = this.details.parent_platforms
          this.developers = this.details.developers
          this.publishers = this.details.publishers
          this.website = this.details.website
          this.stores = this.details.stores
          console.log(this.platforms)
          console.log(this.details)
        })
        }
    }

</script>

<style scoped>
  .about {

  }
  h1 {
    font-size:40px;
    margin-bottom:15px
  }
  .clip {
    height: 100vh;
    width:100vh;
    object-fit:cover
  }
  .slija {
    position:relative;
    width:100vw;
    height: 100vh;
    background-size: cover;
    background-position:top;
    background-attachment: fixed;
  }
  /* .image {
    width:100vw;
    height: 100vh;
    object-fit:cover;
    object-position: center;
  } */
  .shadow {
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height: 100%;
     background: linear-gradient( rgba(0,0,0,0.22452731092436973) 12%, rgba(0,0,0,0.5746673669467788) 44%, rgba(0,0,0,1) 76%, rgba(0,0,0,1) 100%);
  }
  .name {
    position:absolute;
    left:0;
    bottom:0;
    width:100%;
    padding-bottom:50px
  }
  .genres {
    display:flex;
    justify-content: center;
    padding:0 35%;
    flex-wrap:wrap
  }
  .s-genre {
    background:#202020;
    margin:8px;
    padding:7px 12px;
    border-radius: 15px;
    font-size:11px;
    letter-spacing: 1px;
    text-transform:uppercase;
  }

  .more-details {

    padding:0 20%;
  }
  .visit {
    background:#CA3E47;
    width:130px;
    margin:20px auto;
    text-transform: uppercase;
    padding: 7px 0;
    letter-spacing: 2px;
    font-weight: bold;
  }
  .visit-link {
    text-decoration:none;
    color:white;
    width:100%;
    height: 100%;
  }
  .publisher {
    display:flex;
    justify-content:space-evenly
  }
  .pub, .dev {
    display:flex;
  }
  .pub-title {
    color:#CA3E47;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-right: 10px;
  }
  .list p {
    font-size:13px;
    margin-top:2px;
    text-align: left;
  }
  .descr {
    padding:40px 10%;
    text-align: left;
    letter-spacing: 1px;
  }

  .platforms {
    display:flex;
    justify-content: center;
  }
  .plat {
    border: 2px solid #CA3E47;
    margin:2px;
    padding:2px 4px;
    border-radius: 10px;
  }
  .stores {
    padding-bottom:100px;
    display:block;
    justify-content: center;
  }
  .where {
    font-weight: bold;
    color:#CA3E47;
  }
  .store {
    margin:2px;
    font-size:13.5px
  }
  .store-link {
    color:white;
    text-decoration: none;
  }

  @media only screen and (max-width: 600px) {
    .pub, .dev {
      display:block
    }
    .more-details {
      padding:0 5%
    }
    .genres {
      padding:0 10%
    }
  }
</style>
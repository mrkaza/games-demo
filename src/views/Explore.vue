<template>
  <div class="explore">
      <Expopular></Expopular>
      <h3 class="naslov">Explore all games</h3>
      <div class="parametri">
          <div class="input-field">
               <input class="srch"  v-model="search" type="text" placeholder="Search games...">
               <button class="srch-btn" @click="trazi"><img class="search" src="../assets/search.png" alt=""></button>
          </div>
         <div class="params">
             <div class="drop-all">
                <p @click="showSort" class="chose">{{choosenSort}} <span class="dropdown-icon"></span></p>
                <!-- <p v-if="choosenSort.length!=0" @click="showSort" class="chose">Sort by <span class="dropdown-icon"></span></p> -->
                <div class="dropdown-menu" v-bind:class="{dropdownShow:pokaziSort}">
                    <p class="odabir" v-for="(odabirPar,indexPar) in searchParam" :key="indexPar" @click="odabraniSort(indexPar)">{{odabirPar}}</p>
                </div>
             </div>

             <div class="drop-all">
                <p @click="showGenres" class="chose">{{choosenGenre}} <span class="dropdown-icon"></span></p>
                <div class="dropdown-menu" v-bind:class="{dropdownShow:pokaziGenres}">
                     <p class="odabir" v-for="(odabirGen,indexGen) in genres" :key="indexGen" @click="odabraniGenre(indexGen)">{{odabirGen}}</p>
                </div>
             </div>

             <div class="drop-all">
                <p @click="showPlatform" class="chose">{{choosenPlat}} <span class="dropdown-icon"></span></p>
                <div class="dropdown-menu" v-bind:class="{dropdownShow:pokaziPlatform}">
                    <p class="odabir" v-for="(odabirPlat,indexPlat) in platforms" :key="indexPlat" @click="odabraniPlat(indexPlat)">{{odabirPlat}}</p>
                </div>
             </div>

             <button class="params-btn" @click="searchByParams">
                 <img class="search" src="../assets/search.png" alt="">
             </button>
         </div>
      </div>
      <div class="rezultati">
          <div class="srch-rez" v-for="(igrica,index) in searchIgrice" :key="index">
              <div class="res-inside">
                  <img class="image" :src="igrica.background_image" alt="">
                  <p class="game-title">{{igrica.name}}</p>
              </div>
              <router-link class="na-detalje" :to="`/game/${igrica.id}`"></router-link>
          </div>
      </div>
<!-- 
      <div v-if="searchIgrice==0">
          <Params></Params>
      </div>  -->
  </div>
</template>

<script>
import Expopular from '../components/explore/ExPopular.vue'
import Params from '../components/explore/Params'
export default {
    components: {
        Expopular,
        Params
    },
    data() {
        return {
            search: '',
            searchIgrice: [],
            noSearch: '',
            searchParam: ['Popularity', 'Release date', 'Rating',],
            platforms: ['PC', 'Playstation','Xbox','Nintendo'],
            genres: ['Action','Adventure','RPG','Strategy','Shooter','Sports','Fighting','Multiplayer'],
            sortPicked: '',
            platformPicked: '',
            genresPicked:'',
            pokaziSort: false,
            pokaziGenres:false,
            pokaziPlatform:false,
            choosenSort: 'Sort by',
            choosenPlat: 'Platform',
            choosenGenre: 'Genre',

        }
    },
    methods: {
        trazi() {
            this.novisearch = this.search.replace(/\s+/g,'-').toLowerCase()

            if(this.novisearch.length == 0) {
                this.noSearch = 'You must enter search parametar.'
                console.log(this.noSearch)
            } else {
                this.axios.get(`https://api.rawg.io/api/games?search=${this.novisearch}`).then(response => {
                console.log(response.data)
                this.searchIgrice=response.data.results
                this.choosenSort = 'Sort by'
                this.choosenPlat = 'Platform'
                this.choosenGenre = 'Genre'
            })
            }   
        },
        showSort() {
            this.pokaziSort =! this.pokaziSort
        },
        showGenres() {
            this.pokaziGenres =! this.pokaziGenres
        },
        showPlatform() {
            this.pokaziPlatform =! this.pokaziPlatform
        },
        odabraniSort(index) {
            this.choosenSort = this.searchParam[index]
            this.pokaziSort = false
            console.log(this.choosenSort)
        },
        odabraniGenre(index) {
            this.choosenGenre = this.genres[index]
            this.pokaziGenres = false
        },
        odabraniPlat(index) {
            this.choosenPlat = this.platforms[index]
            this.pokaziPlatform = false
        },

        searchParams() {
            this.searchIgrice = []
            
        },
        searchByParams() {
            this.search = ''
            if(this.choosenSort == 'Popularity') {
                this.par = '-added'
            } else if(this.choosenSort == 'Release date') {
                this.par = '-released'
            } else if (this.choosenSort == 'Rating'){
                this.par = '-rating'
            }

            if(this.choosenGenre == 'RPG') {
                this.gen = '&genres=role-playing-games-rpg'
            } else if( this.choosenGenre == 'Multiplayer') {
                this.gen = '&genres=massively-multiplayer'
            } else if( this.choosenGenre == 'Genre') {
                this.gen= ''
            } else {
                this.gen = `&genres=${this.choosenGenre.toLowerCase()}`
            }
            console.log(this.gen)

            if( this.choosenPlat == 'Platform') {
                this.plat = ''
            } else if (this.choosenPlat == 'PC') {
                this.plat = '&platforms=4'
            } else if (this.choosenPlat == 'Playstation') {
                this.plat = '&platforms=187,18,16'
            } else if (this.choosenPlat == 'Xbox') {
                this.plat = '&platforms=1,186,14,80'
            }

             this.axios.get(`https://api.rawg.io/api/games?dates=2010-${this.mjesec}-${this.dan},2020-${this.mjesec}-${this.dan}&ordering=${this.par}${this.gen}${this.plat}`).then(response => {
                 this.searchIgrice=response.data.results
             }).catch(error => {
                 console.log(error)
             })
        }
    },
    created() {
        this.datum = new Date()
        this.mjesec = String(this.datum.getMonth() + 1).padStart(2, '0')
        this.dan = String(this.datum.getDate()).padStart(2, '0')
        this.mjesecvise = 0 +String(Number(this.mjesec) -1 )

        this.axios.get(`https://api.rawg.io/api/games?dates=2020-${this.mjesecvise}-${this.dan},2020-${this.mjesec}-${this.dan}&ordering=-added`).then(response => {
            this.searchIgrice = response.data.results
    })
    }

}
</script>

<style scoped>
    .explore {
        background:#202020;
        color:white;
        padding-top:50px;
    }
    .naslov {
        background:black;
        padding:15px 0 30px 0;
        border-top:2px solid #CA3E47
    }
    .parametri {
        display:flex;
        justify-content: space-evenly;
        background:black;
        padding-bottom:20px;
        border-bottom:2px solid #CA3E47
    }

    .input-field {
        width:40%;
        display:inline-flex;
        padding-left:20px;
        margin:0;
        position:relative;
    }
    .srch {
        height: 30px;
        width:100%;
        background:transparent;
        box-shadow: none;
        border:none;
        outline:none;
        color:white;;
        font-size:16px;
        border-bottom:1px solid rgba(255,255,255,0.7);
        padding:0 10px
    }
    .srch[type=text]:focus {
        border-bottom: 2px solid #CA3E47;
    }
    .btn-srch {
        position:absolute;
        right:0;
        top:0;
        width:30px;
        height: 100%;
        background:transparent;
        box-shadow:none;
        border:none;
    }
    .btn-srch:focus {
        outline:none;
    }
    .btn-srch:hover {
        cursor:pointer
    }
    .params {
        width:60%;
        display:flex;
        justify-content: space-evenly;
        align-items:center
    }

    .rezultati {
        display:flex;
        flex-wrap: wrap;
        width:100%;
        justify-content: center;
        z-index:0;
    }
    .srch-rez{
        width:10%;
        margin:20px;
        box-shadow: 2px 2px 3px black,
                    -2px -2px 3px rgba(255,255,255,0.2);
        /* border: 1px solid rgba(255,255,255,0.4); */
        overflow:hidden;
        position:relative;
       
    }
      .na-detalje {
      position:absolute;
      left:0;
      top:0;
      width:100%;
      height: 100%;
  }
    .res-inside {
        width:100%;
        height: 100%;
    }

    .image {
        width:100%;
        height: 100px;
        object-fit:cover;
        object-position:center;
    }
    .game-title {
        padding:5px 15px 10px 15px;
        font-size:12px
    }

    .chose {
        background:black;
        padding:5px 25px 5px 15px;
        border-radius: 15px;
        border: 2px solid #CA3E47;
        position:relative;
    }
    .chose:hover {
        cursor:pointer;
        background:rgba(0,0,0,0.4)
    }

    .dropdown-icon {
        position:absolute;
        top:11px;
        right:10px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 6px 4.5px 0 4.5px;
        border-color: white transparent transparent transparent;
    }
    .drop-all {
        position:relative;
        width:150px;
    }
    .dropdown-menu {
        position:absolute;
        top:32px;
        left:0;
        width:100%;
        background:black;
        border-radius: 20px;
        padding:10px 0px;
        box-shadow: 5px 5px 10px black;
        border:2px solid #CA3E47;
        display:none;
        z-index:1250
    }
    .dropdownShow {
        display:block
    }
    .odabir {
        padding:5px 5px;
        font-size:13px
    }
    .odabir:hover {
        background:rgba(255,255,255,0.4);
        border-radius: 10px;
        cursor:pointer;
    }
.search {
    height: 100%;
    width:100%;
    
}
.params-btn,.srch-btn {
    background:black;
    border:0;
    width:30px;
    height: 30px;
    outline:none;
}
.srch-btn {
    position:absolute;
    right:10px;
    top:4px;
    width:20px;
    height: 20px;
}
.params-btn, .srch-btn:hover {
    cursor:pointer;
}

@media only screen and (max-width: 1024px) {
    .srch-rez {
        width: 20%;
    }
    .drop-all {
        width:130px;
        font-size:14px
    }
}
@media only screen and (max-width: 768px) {
    .params-btn {
        width:25px;
        height:25px;
    }
}
@media only screen and (max-width: 600px) {
    .srch-rez {
        width:100%;
        margin:0;
        border:none;
        border-bottom:2px solid #CA3E47;
        border-radius:0;
        position:relative;
        height: 200px;
    }
    .game-title {
        position:absolute;
        bottom:0;
        left:0;
        padding-right:40%;
        text-shadow: 2px 2px 2px black;
        letter-spacing: 1px;
        font-weight: bold;
        text-align: left;
    }
    .image {
        opacity:0.7;
        height: 200px;
    }
    .parametri {
        display:block
    }
    .input-field {
        width:100%;
        padding:0;
        margin-bottom:15px
    }

    .params {
        width:100%
    }
    .dwopdown-menu {
        z-index:100
    }
    .rezultati {
        z-index:0;
    }
    .params-btn {
        margin:0 5px;
        width:20px;
        height: 20px;
    }

}


</style>
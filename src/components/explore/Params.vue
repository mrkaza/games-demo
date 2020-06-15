<template>
  <div class="params-all">
    <div class="res-inside" v-for="(game,index) in popularGames" :key="index">
        <img class="image" :src="game.background_image" alt="">
        <p class="game-title">{{game.name}}</p>
    </div>
  </div>
</template>

<script>

export default {
    name:'params',
    data() {
        return {
            popularGames: []
        }
    },
    created() {
        this.datum = new Date()
        this.mjesec = String(this.datum.getMonth() + 1).padStart(2, '0')
        this.dan = String(this.datum.getDate()).padStart(2, '0')
        this.mjesecvise = 0 +String(Number(this.mjesec) -1 )

        this.axios.get(`https://api.rawg.io/api/games?dates=2020-${this.mjesecvise}-${this.dan},2020-${this.mjesec}-${this.dan}&ordering=-added`).then(response => {
            this.popularGames = response.data.results
    })
  },
}
</script>

<style scoped>

    .params-all {
        width:100%;
        padding-bottom:40px;
        display:flex;
        flex-wrap: wrap;
        justify-content:center;
    }
    .res-inside {
        width:20%;
        margin:20px;
        border-radius: 10%;
        overflow:hidden;
        border:1px solid rgba(255,255,255,0.4)
    }
        .image {
        width:100%;
        height: 250px;
        object-fit:cover;
        object-position:center;
    }
    .game-title {
        padding:5px 15px 15px 15px
    }

</style>
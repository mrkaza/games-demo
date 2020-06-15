<template>
  <div id="app">
    <div id="nav">
      <router-link class="link" to="/">home</router-link>
      <router-link to="/explore" class="link">explore</router-link>
    </div>
    <router-view/>
  </div>
</template>


<style>
* {
  margin:0;
  padding:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  position:relative;
  margin:0;
  background:black;
  overflow: hidden;
}

#nav {
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height: 50px;
  background:rgba(0,0,0,0.5);
  z-index:100;
  color:white;
  text-align: right;
  display:flex;
  /* justify-content:flex-end; */
  align-items:center;
  padding:0 50px;
  border-bottom:2px solid #CA3E47
}
.link {
  padding:3px 10px;
  color:white;
  margin:0 5px;
  /* background:rgba(0,0,0,0.4); */
  border-radius: 15px;
  text-transform: uppercase;
  font-size:12px;
  letter-spacing: 1px;
  text-decoration:none;
  
}
.router-link-exact-active {
  background:#CA3E47;
  box-shadow:2px 2px 5px black;
}

</style>

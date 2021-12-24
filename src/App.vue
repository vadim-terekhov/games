<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'App',
  methods: mapActions(['startTimer']),
  created(){  
    this.startTimer();
  }
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color:#2c3e50;
  color: aliceblue;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
</style>

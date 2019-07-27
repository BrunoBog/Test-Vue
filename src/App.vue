<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <bruno />
  </div>
</template>

<script>
import bruno from './components/bruno';
// import Clientes from './components/Clientes';

export default {
  name: 'app',
  components: {
    // HelloWorld,
    bruno
    // cliente
  }
}
</script>

<style>
body{
   background: #008e9b;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
 
}
</style>

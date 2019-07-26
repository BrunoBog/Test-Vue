<template>
  <div>
  <span v-for="todo in todos" :key="todo.idCliente">
    <Clientes :Nome=todo.nome :id=todo.idCliente />
  </span>
    
  </div>
</template>

<script>
import axios from 'axios'
import Clientes from './Clientes'


export default {
  data() {
    return {
      todos: null
    };
  },
  mounted() {
      // console.log("Colé");
      this.getClientes();
  },
  methods: {
      getClientes(){
          axios.get('http://localhost:8085/clients')
          .then( resp => this.todos =  resp.data )
          // .catch( e => console.log(e));
      }
  },
  components:{
    Clientes,
  }
};
</script>

<style>
</style>

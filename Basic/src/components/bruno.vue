<template>
  <span class="container">
    <span v-for="todo in todos" :key="todo.idCliente" class="item">
          <Clientes v-if="true" :Nome="todo.nome" :id="todo.idCliente" />
    </span>
  </span>
</template>

<script>
import axios from "axios";
import Clientes from "./Clientes";

export default {
  data() {
    return {
      todos: null
    };
  },
  mounted() {
    console.log("Colé");
    this.getClientes();
  },
  methods: {
    getClientes() {
      axios
        .get("https://localhost:44320/clients")
        .then(resp => (this.todos = resp.data))
        .catch(e => console.log(e));
    }
  },
  components: {
    Clientes
  }
};
</script>

<style>
.container {
  /* width: 600px;
  height: 200px; height given for illustration */
  
  display: flex;
  flex-flow: row wrap;
  position: relative;
}

.item {
  background: #01a3a4;
  margin: 4px;
  flex: 0 1 calc(20% - 8px); /* <-- adjusting for margin */
}
</style>

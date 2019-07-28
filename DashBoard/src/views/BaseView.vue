<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    
    </base-header>

    <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header bg-transparent">
                            <h3 class="mb-0">Icons</h3>
                        </div>
                        <div class="card-body">
                            <div class="row icon-examples">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <!-- <span class="container">
      <span v-for="todo in todos" :key="todo.idCliente" class="item">
        <Client v-if="true" :Nome="todo.nome" :id="todo.idCliente" />
        <span>{{todo.nome}}</span>
      </span>
    </span> -->
  </div>
</template>

<script>
import axios from "axios";
// import Client from "../components/Client.Vue";

export default {
  data() {
    return {
      todos: null
    };
  },
  mounted() {
    this.getClientes();
  },
  methods: {
    getClientes() {
      axios
        .get("")
        .then(resp => (this.todos = resp.data))
        .catch(e => e);
    }
  },
  components: {
    // Clientes
  }
};
</script>

<style>

</style>

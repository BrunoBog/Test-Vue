<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="row head-clients">
        <div class="head-col">
        <img
          src="https://www.flaticon.com/premium-icon/icons/svg/1923/1923078.svg"
          width="44"
          height="44"
          alt="King premium icon"
          title="King premium icon"
        />
        <h5>Client</h5>
        </div>
        <div class="head-col">
        <img
          src="https://image.flaticon.com/icons/svg/1966/1966503.svg"
          width="44"
          height="44"
          alt="Trial icon"
          title="Trial"
        />
        <h5>Trial</h5>
        </div>
        <div class="head-col">
        <img
          src="https://image.flaticon.com/icons/svg/862/862520.svg"
          width="44"
          height="44"
          alt="Ex - Trial"
          title="Ex - Trial"
        />
        <h5>Cliente que já foi Trial</h5>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <!-- <div class="card-header bg-transparent"></div> -->
            <div class="card-body">
              <div class="row icon-examples">
                <div class="col-lg-3 col-md-6" v-for="client in todos" :key="client.idClient">
                  <router-link
                    :to="{ name: 'detail', params: { id: client.idCliente, clientName: client.nome } }"
                  >
                    <div class="container">
                      <div v-if="!client.trial">
                        <img 
                          src="https://www.flaticon.com/premium-icon/icons/svg/1923/1923078.svg"
                          width="44"
                          height="44"
                          alt="King premium icon"
                          title="King premium icon"
                        />
                      </div>
                      <div v-if="client.trial ">
                        <img v-if="client.trial.ativo"
                          src="https://image.flaticon.com/icons/svg/1966/1966503.svg"
                          width="44"
                          height="44"
                          alt="Trial"
                          title="Trial"
                        />
                        <img v-else
                          src="https://image.flaticon.com/icons/svg/862/862520.svg"
                          width="44"
                          height="44"
                          alt="Robot"
                          title="ExTrial"
                        />
                      </div>
                      <span class="cliente">{{client.nome}}</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axio from "axios";

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
      this.$http
        .get(`${this.$config.server}Clients`)
        .then(resp => (this.todos = resp.data))
        .catch((e) => { console.log(e); this.$router.push({ name: "logout"})});
    }
  },
  components: {}
};
</script>

<style>
.container {
  display: inline-flex;
  margin: 2px;
  /* background-color: #253240; */
  background-color: #222f3e;
  color: #c8d6e5;
  min-height: 40px;
  align-content: center;
}
.cliente {
  margin: auto;
}

.head-col{
  display: flex;
  align-items: center; 
  justify-content: center;
  padding-left: 5px;
}

.head-clients{
  border-radius: 6px;
  margin-right: 8px;
}
</style>

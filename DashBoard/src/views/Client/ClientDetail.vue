<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    <h1>{{name}} Today:</h1>
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-lg-6" v-if="totalOcurrence > 0">
          <stats-card
            title="Ocurrence"
            type="gradient-red"
            :sub-title="totalOcurrence.toString()"
            icon="ni ni-bag-17"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer" v-if="lastOcurrence > 0">
                            <!-- <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span> -->
                            <span class="text-nowrap">last get: {{lastOcurrence.Created.format('DD/MM/YYYY')}}</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6" v-if="totalIndicios > 0">
          <stats-card
            title="Requets"
            type="gradient-orange"
            :sub-title="totalIndicios.toString()"
            icon="ni ni-cloud-download-95"
            class="mb-4 mb-xl-0"
          >
            <!-- <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
                            <span class="text-nowrap">Since last month</span>
            </template>-->
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6" v-if="TotalBrands > 0">
          <stats-card
            title="Brands"
            type="gradient-green"
            :sub-title=TotalBrands
            icon="ni ni-planet"
            class="mb-4 mb-xl-0"
          >
            <!-- <template slot="footer">
              <span class="text-danger mr-2">
                <i class="fa fa-arrow-down"></i> 5.72%
              </span>
              <span class="text-nowrap">Since last month</span>
            </template> -->
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6" v-if="totalQueries > 0">
                    <stats-card title="Queries"
                                type="gradient-info"
                                :sub-title=totalQueries.toString()
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >

                        <!--<template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>-->
                    </stats-card>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id", "name"],
  data() {
    return {
      Id: this.id,
      name: this.name,
      totalOcurrence: Number,
      totalIndicios: Number,
      TotalBrands: Number,
      totalQueries: Number,
      lastOcurrence: Object
    };
  },
  mounted() {
    this.getTotalOcurrence();
    this.getTotalIndicios();
    this.getTotalBrands();
    this.getTotalQueries();
  },
  methods: {
    getTotalOcurrence() {
      axios
        .get(`http://localhost:8085/Ocurrence/TotalToday/${this.id}`) //${1939}
        .then(resp => (this.totalOcurrence = resp.data))
        .catch(e => console.log(e));
    },
    getTotalIndicios() {
      axios
        .get(`http://localhost:8085/Indicio/total/${this.id}`) //${1939}
        .then(resp => (this.totalIndicios = resp.data))
        .catch(e => console.log(e));
    },
    getTotalBrands() {
      axios
        .get(`http://localhost:8085/Marca/totalBrands/${this.id}`) //${1939}
        .then(resp => (this.TotalBrands = resp.data))
        .catch(e => console.log(e));
    },
    getTotalQueries(){
        axios
        .get(`http://localhost:8085/Collect/allQueries/${this.id}`) //${1939}
        .then(resp => (this.totalQueries = resp.data))
        .catch(e => console.log(e));
    },
    getLastOcurrence(){
        axios
        .get(`http://localhost:8085/Ocurrence/lastOcurrence/${this.id}`) //${1939}
        .then(resp => (this.lastOcurrence = resp.data))
        .catch(e => console.log(e));
    }
  }
};
</script>

<style>
</style>

<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <h1>{{ClientName}} Today:</h1>
      <!-- Card cards -->
      <div class="row">
        <div class="col-xl-3 col-lg-6" v-if="totalOcurrence > 0">
          <stats-card
            title="Ocurrences"
            type="gradient-red"
            :sub-title="totalOcurrence.toString()"
            icon="ni ni-bag-17"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer" v-if="lastOcurrence > 0">
              <span
                class="text-nowrap"
              >last: {{lastOcurrence.getHours()}} : {{lastOcurrence.getMinutes()}}</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6" v-if="totalIndicios > 0">
          <stats-card
            title="Requests"
            type="gradient-orange"
            :sub-title="totalIndicios.toString()"
            icon="ni ni-cloud-download-95"
            class="mb-4 mb-xl-0"
          ></stats-card>
        </div>
        <div class="col-xl-3 col-lg-6" v-if="TotalBrands > 0">
          <stats-card
            title="Brands"
            type="gradient-green"
            :sub-title="TotalBrands.toString()"
            icon="ni ni-planet"
            class="mb-4 mb-xl-0"
          ></stats-card>
        </div>
        <div class="col-xl-3 col-lg-6" v-if="totalQueries > 0">
          <stats-card
            title="Queries"
            type="gradient-info"
            :sub-title="totalQueries.toString()"
            icon="ni ni-chart-bar-32"
            class="mb-4 mb-xl-0"
          ></stats-card>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <!-- <LineChart :xAxis=x :yAxis=y ></LineChart>  -->

        <div class="col-xl-8 mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                <h5 class="h3 text-white mb-0">Coletas nos ultimos 30 dias</h5>
              </div>
              <div class="col">
                <ul class="nav nav-pills justify-content-end">
                  <li class="nav-item mr-2 mr-md-0">
                    <a
                      class="nav-link py-2 px-3"
                      href="#"
                      :class="{active: bigLineChart.activeIndex === 0}"
                      @click.prevent="initBigChart(0)"
                    >
                      <span class="d-none d-md-block">Month</span>
                      <span class="d-md-none">M</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link py-2 px-3"
                      href="#"
                      :class="{active: bigLineChart.activeIndex === 1}"
                      @click.prevent="initBigChart(1)"
                    >
                      <span class="d-none d-md-block">Mês também</span>
                      <span class="d-md-none">W</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <line-chart
              :height="350"
              ref="bigChart"
              :chart-data="bigLineChart.chartData"
              :extra-options="bigLineChart.extraOptions"
            ></line-chart>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as chartConfigs from "@/components/Charts/config";
import LineChart from "@/components/Charts/LineChart";

export default {
  name: "ClientDetail",
  props: ["id", "clientName"],
  data() {
    return {
      Id: this.id,
      ClientName: this.clientName,
      totalOcurrence: Number,
      totalIndicios: Number,
      TotalBrands: Number,
      totalQueries: Number,
      lastOcurrence: Date,
      CollectInMonth: Object,
      x: Array,
      y: Array,
      bigLineChart: {
        allData: [this.x, this.y],
        activeIndex: 0,
        chartData: {
          datasets: [],
          labels: []
        },
        extraOptions: chartConfigs.blueChartOptions
      }
    };
  },
  components: {
    LineChart
  },
  mounted() {
    this.getTotalOcurrence();
    this.getTotalIndicios();
    this.getTotalBrands();
    this.getTotalQueries();
    this.getCollectInMonth()
      .then(a => this.initBigChart(0, a.data))
      // .catch(e => console.log(e));
  },
  methods: {
    getTotalOcurrence() {
      axios
        .get(`https://localhost:44320/Ocurrence/TotalToday/${this.id}`) 
        .then(resp => (this.totalOcurrence = resp.data))
        // .catch(e => console.log(e));
    },
    async getTotalIndicios() {
      axios
        .get(`https://localhost:44320/Indicio/total/${this.id}`) 
        .then(resp => (this.totalIndicios = resp.data))
        // .catch(e => console.log(e));
    },
    async getTotalBrands() {
      axios
        .get(`https://localhost:44320/Marca/totalBrands/${this.id}`) 
        .then(resp => (this.TotalBrands = resp.data))
        // .catch(e => console.log(e));
    },
    async getTotalQueries() {
      axios
        .get(`https://localhost:44320/Collect/allQueries/${this.id}`) 
        .then(resp => (this.totalQueries = resp.data))
        // .catch(e => console.log(e));
    },
    async getLastOcurrence() {
      axios
        .get(`https://localhost:44320/Ocurrence/lastOcurrence/${this.id}`) 
        .then(resp => (this.lastOcurrence = resp.data.created))
        // .catch(e => console.log(e));
    },
    async getCollectInMonth() {
      return axios
        .get(`https://localhost:44320/Collect/CollectsinMonth/${this.id}`)
    },
    initBigChart(index, data) {
      
      let valores = data.map(a => a.count);
      let datas = data.map(a => new Date(a.day));
      
      let chartData = {
        datasets: [
          {
            label: "Coleta",
            data: [valores, datas][index]
          }
        ],
        labels: datas.map(a => a.getDate().toString() + '/' 
                              + a.getMonth().toString()+ '/' 
                              + a.getFullYear().toString())
      };
      
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = datas.map(a => a.getDate());
    }
  }
};
</script>

<style>

</style>

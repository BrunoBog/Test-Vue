<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <h1>{{clientName}} Today:</h1>
      <!-- Card cards -->
      <div class="row">
        <div class="col-xl-3 col-lg-6" v-if="totalOcurrence > 0">
          <stats-card
            title="Ocurrenc"
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
            title="Requets"
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
            :sub-title="TotalBrands"
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
        <div class="col">
          <div class="card shadow">
            <div class="card-header bg-transparent"></div>
            
            <div id="chart">
              <apexchart type="line" height="350" :options="chartOptions" :series="series" />
            </div>

            <div class="card-body"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-apexcharts"></script>
<script>
import axios from "axios";
import ApexCharts from "apexcharts";

export default {
  props: ["id", "clientName"],
  data() {
    return {
      Id: this.id,
      clientName: this.clientName,
      totalOcurrence: Number,
      totalIndicios: Number,
      TotalBrands: Number,
      totalQueries: Number,
      lastOcurrence: Date,
      CollectInMonth: Object,
      series: [
        {
          name: "Likes",
          data: []
        }
      ],
      chartOptions: {
        chart: {
          type: "line",
          shadow: {
            enabled: false,
            color: "#bbb",
            top: 3,
            left: 2,
            blur: 3,
            opacity: 1
          }
        },
        stroke: {
          width: 7,
          curve: "smooth"
        },

        xaxis: {
          type: "datetime",
          categories: []
        },
        title: {
          text: "Social Media",
          align: "left",
          style: {
            fontSize: "16px",
            color: "#666"
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#FDD835"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },
        markers: {
          size: 4,
          opacity: 0.9,
          colors: ["#FFA41B"],
          strokeColor: "#fff",
          strokeWidth: 2,

          hover: {
            size: 7
          }
        },
        yaxis: {
          min: -10,
          max: 40,
          title: {
            text: "Engagement"
          }
        }
      }
    };
  },
  mounted() {
    this.getTotalOcurrence();
    this.getTotalIndicios();
    this.getTotalBrands();
    this.getTotalQueries();
    this.getCollectInMonth();
  },
  methods: {
    getTotalOcurrence() {
      axios
        .get(`http://localhost:8085/Ocurrence/TotalToday/${this.id}`) //${1939}
        .then(resp => (this.totalOcurrence = resp.data))
        .catch(e => console.log(e));
    },
    async getTotalIndicios() {
      axios
        .get(`http://localhost:8085/Indicio/total/${this.id}`) //${1939}
        .then(resp => (this.totalIndicios = resp.data))
        .catch(e => console.log(e));
    },
    async getTotalBrands() {
      axios
        .get(`http://localhost:8085/Marca/totalBrands/${this.id}`) //${1939}
        .then(resp => (this.TotalBrands = resp.data))
        .catch(e => console.log(e));
    },
    async getTotalQueries() {
      axios
        .get(`http://localhost:8085/Collect/allQueries/${this.id}`) //${1939}
        .then(resp => (this.totalQueries = resp.data))
        .catch(e => console.log(e));
    },
    async getLastOcurrence() {
      axios
        .get(`http://localhost:8085/Ocurrence/lastOcurrence/${this.id}`) //${1939}
        .then(resp => (this.lastOcurrence = resp.data.created))
        .catch(e => console.log(e));
    },
    getCollectInMonth() {
      axios
        .get(`http://localhost:8085/Collect/CollectsinMonth/${this.id}`) //${1939}
        .then(resp => {
          
          this.series.data = resp.data.map(a => a.count);
          console.log(this.series.data);
          this.chartOptions.xaxis.categories = resp.data
          .map(a => a.day);
          // .map(a => a.day.getDay().toString()+ '/' + a.day.getMonth().toString() + '/' + a.day.getFullYear().toString());
          console.log(this.chartOptions.xaxis.categories );
        })
        .catch(e => console.log(e));
    }
  }
};
</script>

<style>
</style>

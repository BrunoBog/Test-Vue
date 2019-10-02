<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-lg-6" v-if="totalIndicios > 0">
          <stats-card
            title="Indicios"
            type="gradient-red"
            :sub-title="totalIndicios.toString()"
            icon="ni ni-active-40"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2">
                <i
                  class="fa fa-arrow-up"
                  v-if="totalIndicios - diffCollectValue > 0"
                >{{(totalIndicios - diffCollectValue)}}</i>
              </span>
              <span class="text-danger mr-2">
                <i
                  class="fa fa-arrow-down"
                  v-if="totalIndicios - diffCollectValue < 0"
                >{{(totalIndicios - diffCollectValue)}}</i>
              </span>
              <span class="text-nowrap">than yesterday</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="total Clients"
            type="gradient-orange"
            :sub-title="totalClients.toString()"
            icon="ni ni-chart-pie-35"
            class="mb-4 mb-xl-0"
            v-if="totalClients > 0"
          >
            <template slot="footer">
              <span class="text-success mr-2">
                <i class="fa fa-arrow-up"></i>
                {{totalTrial}}
              </span>
              <span class="text-nowrap">In Trial</span>
            </template>
          </stats-card>
        </div>
        <!--<div class="col-xl-3 col-lg-6">
                    <stats-card title="Sales"
                                type="gradient-green"
                                sub-title="924"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Performance"
                                type="gradient-info"
                                sub-title="49,65%"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
        </div>-->
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-8 mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                <h5 class="h3 text-white mb-0">Sales value</h5>
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

        <!-- <div class="col-xl-4">
          <card header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                <h5 class="h3 mb-0">Top Users</h5>
              </div>
            </div>

            <bar-chart :height="350" ref="barChart" :chart-data="redBarChart.chartData"></bar-chart>
          </card>
        </div>-->
      </div>
      <!-- End charts

      Tables-->
      <!-- <div class="row mt-5">
                <div class="col-xl-8 mb-5 mb-xl-0">
                    <page-visits-table></page-visits-table>
                </div>
                <div class="col-xl-4">
                    <social-traffic-table></social-traffic-table>
                </div>
      </div>-->
      <!--End tables-->
    </div>
  </div>
</template>
<script>
// Charts
import * as chartConfigs from "@/components/Charts/config";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";

// Tables
import SocialTrafficTable from "./Dashboard/SocialTrafficTable";
import PageVisitsTable from "./Dashboard/PageVisitsTable";

export default {
  components: {
    LineChart,
    BarChart,
    PageVisitsTable,
    SocialTrafficTable
  },
  data() {
    return {
      idClient: this.id,
      totalClients: Number,
      totalTrial: Number,
      totalIndicios: Number,
      diffCollectValue: Number,
      topClients: Object,
      bigLineChart: {
        allData: [
          [0, 20, 10, 30, 15, 40, 20, 60, 60],
          [0, 20, 5, 25, 10, 30, 15, 40, 40]
        ],
        activeIndex: 0,
        chartData: {
          datasets: [],
          labels: []
        },
        extraOptions: chartConfigs.blueChartOptions
      },
      redBarChart: {
        chartData: {
          labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Coletas de Hoje",
              data: [25, 20, 30, 22, 17, 29]
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.getAllTotalOfRequests();
    this.getAllMonthRequests().then(r => this.initBigChart(0, r.data));
    this.getClientes();
    this.getDiffCollect();
  },
  methods: {
    async getTopClients(quant) {
      this.$http
        .get(`${this.$config.server}Collect/TopClientsToday/${quant}`)
        .then(resp => (this.topClients = resp.data))
        .catch(e => {
          console.log(e);
          this.$router.push({ name: "logout" });
        });
    },
    async getAllMonthRequests() {
      return this.$http.get(`${this.$config.server}Indicio/Indicios`);
    },
    async getAllTotalOfRequests() {
      this.$http
        .get(`${this.$config.server}Indicio/TotalIndicios`)
        .then(resp => (this.totalIndicios = resp.data))
        .catch(e => {
          console.log(e);
          this.$router.push({ name: "logout" });
        });
    },
    async getLastOValueOcurrence() {
      this.$http
        .get(`${this.$config.server}Ocurrence/lastOValueOcurrence/${this.id}`)
        .then(resp => (this.diffCollectValue = resp.data.created))
        .catch(e => {
          console.log(e);
          this.$router.push({ name: "logout" });
        });
    },
    async initBigChart(index, data) {
      let teste1 = data.map(a => a.count);
      let teste2 = data.map(a => new Date(a.day));

      let chartData = {
        datasets: [
          {
            label: "Coletas",
            data: [teste1, teste2][index]
          }
        ],
        labels: teste2.map(
          a =>
            a.getDate().toString() +
            "/" +
            a.getMonth().toString() +
            "/" +
            a.getFullYear().toString()
        )
      };
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = teste2.map(a => a.getDate());
    },
    async getTop5TopCollect() {
      this.$http
        .get(`${this.$config.server}collect/Top10collect`, {
          count: 6,
          day: "08/06/2019"
        })
        .then(resp => {
          this.redBarChart.chartData.labels = resp.map(a => a.clientName);
          this.redBarChart.chartData.datasets = resp.map(o => {
            label: "teste";
            data: o.ocurrenceCount;
          });
        })
        .catch(e => {
          console.log(e);
          this.$router.push({ name: "logout" });
        });
    },
    async getClientes() {
      this.$http
        .get(`${this.$config.server}Clients`)
        .then(resp => {
          let clients = resp.data.map(c => c.Ativo);
          this.totalClients = clients.length;
        })
        .catch(e => {
          console.log(e);
          this.$router.push({ name: "logout" });
        });

      let trial = this.$http
        .get(`${this.$config.server}Trial`)
        .then(resp => {
          let trial = resp.data.map(c => c.Ativo);
          this.totalTrial = trial.length;
        })
        .catch(e => {
          console.log(e);
          this.$router.push({ name: "logout" });
        });
    },
    async getDiffCollect() {
      this.$http.get(`${this.$config.server}Indicio/westerdayTotal`).then(r => {
        this.diffCollectValue = r.data;
      });
    }
  }
};
</script>
<style></style>

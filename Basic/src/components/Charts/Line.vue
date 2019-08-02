<template>
    <div>
        <div id="chart">
              <apexchart type="line" height="350" :options="chartOptions" :series="series" />
        </div>
    </div>
</template>

<script>
import ApexCharts from "apexcharts";

export default {
    props: ["x", "y"],
data() {
    return {
        series: [
        {
          name: "Likes",
          data: y
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
          categories: x
        },
        title: {
          text: "Coletas",
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
    },
    mounted() {
        
    },
}
}
</script>

<style>

</style>

<template>
  <div class="container">
    <Bar v-if="loaded" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { bitcoinService } from '../services/bitcoin.service'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BitCoinChart',
  components: { Bar },
  data() {
    return {
      loaded: false,
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Bitcoin Price',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
            ],
            borderWidth: 1,
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },

  methods: {
    async fetchBitcoinData() {
      try {
        const marketPriceHistory = await bitcoinService.getMarketPriceHistory('30days')
        const prices = marketPriceHistory.values.map((entry) => entry.y)
        const dates = marketPriceHistory.values.map((entry) => new Date(entry.x * 1000).toLocaleDateString())

        this.chartData.labels = dates
        this.chartData.datasets[0].data = prices
      } catch (error) {
        console.error('Error fetching bitcoin data:', error)
      }
    },
  },

  mounted() {
    this.loaded = true
    this.fetchBitcoinData()
  },
}
</script>

<style lang="scss" scoped>
.container {
  height: 500px;
  width: 500px;
}

@media (max-width: 400px) {
  .container {
    height: 360px;
    width: 360px;
  }
}
</style>

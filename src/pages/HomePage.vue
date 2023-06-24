<template>
  <main class="home-page-layout">
    <div class="user-info">
      <h2>Welcome, {{ username }}</h2>
      <p>Balance: {{ balance }}</p>
    </div>
    <div class="bitcoin-rate">
      <h2>Current Bitcoin Rate:</h2>
      <p>{{ bitcoinRate }} USD</p>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import { userService } from '@/services/user.service'
import { bitcoinService } from '@/services/bitcoin.service'

export default {
  setup() {
    const username = ref('Noam Green')
    const balance = ref(0)
    const bitcoinRate = ref(0)

    onMounted(async () => {
      const user = await userService.getUser()
      username.value = user.name
      balance.value = user.balance

      const rate = await bitcoinService.getRate()
      bitcoinRate.value = rate.USD.last
    })

    return {
      username,
      balance,
      bitcoinRate,
    }
  },
}
</script>

<style scoped>
.home-page-layout {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  color: white;
  border-radius: 8px;
}

.user-info {
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

p {
  font-size: 1rem;
  margin: 0;
}

.bitcoin-rate {
  background-color: #ffffffa3;
  text-align: center;
  color: rgba(0, 0, 0, 0.438);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

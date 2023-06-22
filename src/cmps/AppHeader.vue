<template>
  <header class="app-header">
    <RouterLink to="/"> <h2>Mr. BitCoin</h2></RouterLink>
    <div class="user-info">
      <p>User: {{ username }}</p>
      <p>Bitcoin Rate: {{ bitcoinRate }} USD</p>
    </div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
      <RouterLink to="/stats">Statistics</RouterLink>
    </nav>
  </header>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { userService } from '@/services/user.service'
import { bitcoinService } from '@/services/bitcoin.service'

export default {
  setup() {
    const username = ref('Noam Green')
    const bitcoinRate = ref(0)

    onMounted(async () => {
      // const user = await userService.get(userId)
      // username.value = user.username

      const rate = await bitcoinService.getRate()
      bitcoinRate.value = rate.USD.last
    })

    return {
      username,
      bitcoinRate,
    }
  },
}
</script>

<style lang="scss">
.app-header {
  background-color: #333;
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  color: #fff;
  margin-left: 1rem;
  text-decoration: none;
}

nav a:hover {
  // text-decoration: underline;
}

.user-info {
  text-align: center;
}

p {
  margin: 0;
}
</style>

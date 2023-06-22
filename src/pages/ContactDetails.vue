<template>
  <article v-if="contact" class="contact-details">
    <h2>{{ contact.email }}</h2>
    <h3>{{ contact.phone }}</h3>
    <RouterLink to="/contact">
      <button class="back-button">Back</button>
    </RouterLink>
  </article>
</template>

<script>
import { contactService } from '@/services/contact.service.js'

export default {
  data() {
    return {
      contact: null,
    }
  },
  async created() {
    const contactId = this.$route.params.id
    this.contact = await contactService.getContactById(contactId)
  },
}
</script>

<style lang="scss">
.contact-details {
  // max-width: 400px;
  height: 60vh;
  padding: 20px;
  background-color: #3333336d;
  border-radius: 4px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

h3 {
  font-size: 18px;
  margin-bottom: 20px;
}

.back-button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  position: fixed;
  bottom: 25em;
  right: 2em;
  cursor: pointer;
}

.back-button:hover {
  background-color: #45a049;
}
</style>

<template>
  <form @submit.prevent="save" v-if="contact" class="contact-edit">
    <div class="form-group">
      <label for="name">Name:</label>
      <input v-model="contact.name" type="text" id="name" class="form-input" />
    </div>
    <div class="form-group">
      <label for="Phone">Phone:</label>
      <input v-model="contact.phone" type="Phone" id="Phone" class="form-input" />
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input v-model="contact.email" type="email" id="email" class="form-input" />
    </div>
    <button class="save-button">Save</button>
  </form>
</template>

<script>
import { contactService } from '@/services/contact.service.js'

export default {
  data() {
    return {
      contact: null,
    }
  },
  methods: {
    async save() {
      await contactService.save(this.contact)
      console.log(this.contact)
      this.$router.push('/contact')
    },
  },
  async created() {
    const contactId = this.$route.params.id
    if (contactId) {
      this.contact = await contactService.getById(contactId)
    } else {
      this.contact = contactService.getEmptyContact()
    }
  },
}
</script>

<style lang="scss">
.contact-edit {
  color: black;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.save-button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #45a049;
}
</style>

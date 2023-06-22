<template>
  <section class="contacts-list">
    <!-- <TransitionGroup name="list" tag="ul"> -->
    <li v-for="contact in contacts" :key="contact.id" class="contact-item">
      <ContactsPreview :contacts="contact" />
      <section class="actions">
        <RouterLink :to="`/contact/${contact._id}`" class="action-button"> Details </RouterLink>
        <RouterLink :to="`/contact/edit/${contact._id}`" class="action-button"> Edit </RouterLink>
        <button @click="onRemoveContact(contact._id)" class="action-button delete-button">x</button>
      </section>
    </li>
    <!-- </TransitionGroup> -->
  </section>
</template>

<script>
import ContactsPreview from '@/cmps/ContactPreview.vue'

export default {
  props: {
    contacts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onRemoveContact(contactId) {
      this.$emit('remove', contactId)
    },
  },
  components: {
    ContactsPreview,
  },
}
</script>

<style lang="scss">
.contacts-list {
  margin-top: 20px;
  padding: 10px;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f7f7f7;
  color: #333333;
}

.actions {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.action-button {
  margin-left: 10px;
  padding: 6px 12px;
  border: none;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-button:hover {
  background-color: #e5e5e5;
}

.delete-button {
  color: #f44336;
  background-color: transparent;
  border-color: transparent;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>

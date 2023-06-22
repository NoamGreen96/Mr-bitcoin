<template>
  <div>
    <UserMsg />
    <section class="filter-add-container">
      <ContactsFilter @filter="onSetFilterBy" />
      <RouterLink to="/contact/edit">
        <button class="add-button">Add Contact</button>
      </RouterLink>
    </section>
    <ContactsList @remove="removeContacts" v-if="contacts" :contacts="filteredContacts" />
  </div>
</template>

<script>
import { contactService } from '@/services/contact.service'
import { eventBus } from '@/services/eventBus.service'
import { userService } from '@/services/user.service'

import ContactsList from '@/cmps/ContactList.vue'
import ContactsFilter from '@/cmps/ContactFilter.vue'
import UserMsg from '@/cmps/UserMsg.vue'

export default {
  data() {
    return {
      contacts: null,
      filterBy: {},
    }
  },
  methods: {
    async removeContacts(contactId) {
      const msg = {
        txt: `Contact ${contactId} removed...`,
        type: 'success',
      }
      await contactService.deleteContact(contactId)

      const idx = this.contacts.findIndex((contact) => contact._id === contactId)
      this.contacts.splice(idx, 1)
      eventBus.emit('user-msg', msg)
    },
    onSetFilterBy(filterBy) {
      console.log(filterBy)
      this.filterBy = filterBy
    },
  },
  computed: {
    filteredContacts() {
      const regex = new RegExp(this.filterBy.name, 'i')
      return this.contacts.filter((contact) => regex.test(contact.name))
    },
  },
  async created() {
    this.contacts = await contactService.getContacts()
  },
  components: {
    ContactsList,
    ContactsFilter,
    UserMsg,
  },
}
</script>

<style lang="scss">
.filter-add-container {
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.contacts-filter {
  display: flex;
  gap: 10px;
}

.add-button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #45a049;
}
</style>

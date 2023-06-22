<template>
  <section class="contacts-filter">
    <p>Search:</p>
    <input @input="onSetFilterBy" v-model="filterBy.name" type="text" />
  </section>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        name: '',
      },
    }
  },
  methods: {
    onSetFilterBy() {
      this.$emit('filter', this.filterBy)
    },
  },
}
</script>

<style lang="scss"></style>

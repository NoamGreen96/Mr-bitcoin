<template>
  <article class="contacts-preview">
    <h2>Name: {{ contacts.name }}</h2>
  </article>
</template>

<script>
export default {
  props: {
    contacts: { type: Object, required: true },
  },
}
</script>

<style lang="scss"></style>

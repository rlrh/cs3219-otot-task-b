<template>
    <div>
        <h1>{{ text }}</h1>
        <h3>{{ user }}</h3>
    </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    messageId: String,
    text: String,
    user: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
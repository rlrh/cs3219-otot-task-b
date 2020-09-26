<template>
  <div>
    <div v-for="(message, index) in messages" :key="message._id" class="mb-3">
      <Message :text="message.text" :username="usernames[index]" :onDelete="makeDelete(message)" :onEdit="makeEdit(message)"/>
    </div>
  </div>
</template>

<script>
import Message from './Message.vue'

export default {
  name: 'MessageList',
  props: {
    messages: Array,
    users: Array,
    session: Object,
    deleteFn: Function,
    editFn: Function
  },
  components: {
    Message
  },
  computed: {
    usernames() {
      if (this.users) {
        return this.messages
        .map(message => message.user)
        .map(userId => this.users.find(user => user._id === userId))
        .map(user => user.username)
      } else {
        return this.messages.map(message => message.user)
      }
    }
  },
  methods: {
    makeDelete(message) {
      if (message.user === this.session._id) {
        return () => this.deleteFn(message)
      } else {
        return null
      }
    },
    makeEdit(message) {
      if (message.user === this.session._id) {
        return (text) => this.editFn(message, text)
      } else {
        return null
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
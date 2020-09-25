<template>
    <ul>
        <li v-for="message in messages" :key="message._id">
            <Message :text="message.text" :user="message.user" :message-id="message._id" />
        </li>
    </ul>
</template>

<script>
import Message from './Message.vue'

export default {
  name: 'MessageList',
  components: {
    Message
  },
  data () {
    return {
      messages: null
    }
  },
  mounted () {
    fetch('https://cs3219-a0180340u-otot-task-b.herokuapp.com/messages')
    .then(response => response.json())
    .then(data => this.messages = data)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
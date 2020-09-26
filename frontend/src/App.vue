<template>
  <div id="app" class="container">
    <div class="row mt-5 d-flex">
      <h1 class="flex-grow-1">Message Board</h1>
      <b-button disabled>{{ session.username }}</b-button>
    </div>
    <div class="row mt-5">
      <b-form-input v-model="text" placeholder="Enter a message" @keyup.enter="handleCreateMessage"></b-form-input>
    </div>
    <div class="row mt-5">
      <MessageList :messages="messages" :users="users" :session="session" :deleteFn="deleteMessage" :editFn="editMessage" />
    </div>
  </div>
</template>

<script>
import MessageList from './components/MessageList.vue'

export default {
  name: 'App',
  components: {
    MessageList
  },
  data () {
    return {
      messages: null,
      users: null,
      session: null,
      text: null
    }
  },
  mounted() {
    fetch('https://cs3219-a0180340u-otot-task-b.herokuapp.com/messages')
    .then(response => response.json())
    .then(data => this.messages = data);
    fetch('https://cs3219-a0180340u-otot-task-b.herokuapp.com/users')
    .then(response => response.json())
    .then(data => this.users = data);
    fetch('https://cs3219-a0180340u-otot-task-b.herokuapp.com/session')
    .then(response => response.json())
    .then(data => this.session = data);
  },
  methods: {
    createMessage(text) {
      fetch(`https://cs3219-a0180340u-otot-task-b.herokuapp.com/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.messages = [ data, ...this.messages]
      })
      .catch(error => console.log(error))
    },
    deleteMessage(message) {
      fetch(`https://cs3219-a0180340u-otot-task-b.herokuapp.com/messages/${message._id}`, {
        method: 'DELETE',
      })
      .then(() => this.messages = this.messages.filter(item => item._id !== message._id))
      .catch(error => console.log(error))
    },
    editMessage(message, text) {
      fetch(`https://cs3219-a0180340u-otot-task-b.herokuapp.com/messages/${message._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
      })
      .then(() => this.messages = this.messages.map(item => item._id === message._id ? { ...item, text: text } : item))
      .catch(error => console.log(error))
    },
    handleCreateMessage() {
      this.createMessage(this.text);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

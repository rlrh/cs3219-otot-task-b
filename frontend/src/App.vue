<template>
  <div id="app" class="bg-info">
    <div class="container">
      <div class="row pt-5 d-flex">
        <h1 class="flex-grow-1 display-4 text-white">Message Board</h1>
        <b-button variant="outline-light" disabled>{{
          session ? session.username : "Loading..."
        }}</b-button>
      </div>
      <div class="row pt-5 input-group">
        <b-form-input
          v-model="text"
          @keyup.enter="handleCreateMessage"
          placeholder="Enter a message"
          size="lg"
        ></b-form-input>
        <div class="input-group-append">
          <b-button @click="handleCreateMessage" variant="light"
            >Post</b-button
          >
        </div>
      </div>
      <div class="row pt-5" v-if="messages.length">
        <MessageList
          :messages="messages"
          :users="users"
          :session="session"
          :deleteFn="deleteMessage"
          :editFn="editMessage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MessageList from "./components/MessageList.vue";

export default {
  name: "App",
  components: {
    MessageList,
  },
  data() {
    return {
      messages: [],
      users: [],
      session: {},
      text: "",
    };
  },
  mounted() {
    fetch(`${process.env.VUE_APP_BACKEND_URL}/messages`)
      .then((response) => response.json())
      .then((data) => (this.messages = data));
    fetch(`${process.env.VUE_APP_BACKEND_URL}/users`)
      .then((response) => response.json())
      .then((data) => (this.users = data));
    fetch(`${process.env.VUE_APP_BACKEND_URL}/session`)
      .then((response) => response.json())
      .then((data) => (this.session = data));
  },
  methods: {
    createMessage(text) {
      fetch(`${process.env.VUE_APP_BACKEND_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.messages = [data, ...this.messages];
        })
        .catch((error) => console.log(error));
    },
    deleteMessage(message) {
      fetch(`${process.env.VUE_APP_BACKEND_URL}/messages/${message._id}`, {
        method: "DELETE",
      })
        .then(
          () =>
            (this.messages = this.messages.filter(
              (item) => item._id !== message._id
            ))
        )
        .catch((error) => console.log(error));
    },
    editMessage(message, text) {
      fetch(`${process.env.VUE_APP_BACKEND_URL}/messages/${message._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      })
        .then(
          () =>
            (this.messages = this.messages.map((item) =>
              item._id === message._id ? { ...item, text: text } : item
            ))
        )
        .catch((error) => console.log(error));
    },
    handleCreateMessage() {
      this.createMessage(this.text);
    },
  },
};
</script>

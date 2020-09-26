<template>
  <b-card :title="newText" :sub-title="username">
    <b-button v-if="onEdit && !editing" @click="toggleEditing" variant="link">Edit</b-button>
    <b-form-input v-if="editing" v-model="newText" placeholder="Enter new text"></b-form-input>
    <b-button v-if="editing" @click="doneEditing" variant="link">Done</b-button>
    <b-button v-if="editing" @click="cancelEditing" variant="link">Cancel</b-button>
    <b-button v-if="onDelete && !editing" @click="onDelete" variant="link">Delete</b-button>
  </b-card>
</template>

<script>
export default {
  name: 'Message',
  props: {
    text: String,
    username: String,
    onDelete: Function,
    onEdit: Function
  },
  data() {
    return {
      newText: this.text,
      editing: false
    }
  },
  methods: {
    toggleEditing() {
      this.editing = !this.editing
    },
    cancelEditing() {
      this.newText = this.text;
      this.toggleEditing();
    },
    doneEditing() {
      this.onEdit(this.newText);
      this.toggleEditing();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
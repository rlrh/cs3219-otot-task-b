<template>
  <b-card :title="newText" :sub-title="username">
    <b-button v-if="onEdit && !editing" @click="toggleEditing" variant="link" class="text-info">Edit</b-button>
    <div v-if="editing" class="input-group">
      <b-form-input v-model="newText" @keyup.enter="doneEditing" placeholder="Enter new text"></b-form-input>
      <b-button @click="doneEditing" variant="link" class="text-success">Done</b-button>
      <b-button @click="cancelEditing" variant="link" class="text-danger">Cancel</b-button>
    </div>
    <b-button v-if="onDelete && !editing" @click="onDelete" variant="link" class="text-danger">Delete</b-button>
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
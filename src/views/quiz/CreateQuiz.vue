<template>
  <div class="border">
    <form>
      <label for="title">Quiz Title</label>
      <input type="text" id="title" v-model="title" />
      <button @click.prevent="submitQuiz">Create</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      title: "",
      description: null,
      lessonSlug: null
    };
  },
  methods: {
    ...mapActions(["createNewQuiz"]),
    submitQuiz() {
      const newQuiz = {
        title: this.title,
        description: this.description,
        lessonSlug: this.lessonSlug
      };
      this.createNewQuiz(newQuiz);
      this.title = "";
    }
  }
};
</script>

<style></style>

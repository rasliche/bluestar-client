<template>
  <div class="user-dashboard justify-center">
    <div class="w-5/6">
      <h1 class="border-blue-lighter border-b-4 mb-4">User Dashboard Page</h1>
    </div>
    <div class="w-5/6">
      <p>Name: {{ name }}</p>
      <p>Email: {{ email }}</p>
      <p>Operators: {{ operators || "None yet" }}</p>
      <p>Lesson Scores: </p>
      <div class="score m-auto w-5/6 flex flex-row" v-for="lesson in lessonScores" :key="lesson._id">
        <p class="mr-auto self-start">{{ lesson.lessonName }}</p>
        <p class="ml-auto self-end">{{ lesson.score }}%</p>
      </div>
      <p v-if="isAdmin">You are an admin.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import Api from "@/services/Api";

export default {
  computed: {
    ...mapState(["name", "email", "operators", "lessonScores", "isAdmin"])
  }
};
</script>
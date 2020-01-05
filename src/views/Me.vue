<template>
  <main class="user-dashboard">
    <h1 class="page-heading">
      Your Dashboard
    </h1>
    <div class="w-5/6">
      <p>Name: {{ name }}</p>
      <p>Email: {{ email }}</p>
      <p>Operators: 
        <span v-if="operators.length">{{ operators }}</span>
        <span v-else>You haven't joined any organizations yet.</span>
      </p>
      <p>Lesson Scores: </p>
      <div class="score m-auto w-5/6 flex flex-row" v-for="lesson in lessonScores" :key="lesson._id">
        <p class="mr-auto self-start">{{ lesson.lessonName }}</p>
        <p class="ml-auto self-end">{{ lesson.score }}%</p>
      </div>
      <p v-if="isAdmin">You are an admin.</p>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
// import Api from "@/services/Api";

export default {
  data() {
    return {
      updatePasswordModal: false
    }
  },
  computed: {
    ...mapState('user', [
        "name", 
        "email", 
        "operators", 
        "lessonScores", 
        "isAdmin"
        ])
  }
};
</script>
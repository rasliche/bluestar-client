<template>
  <main class="user-dashboard">
    <h1 class="page-heading">
      Dashboard
    </h1>
    <section>
      <p class="text-2xl">{{ name }}</p>
      <p>{{ email }}</p>
      <p v-if="isAdmin">You are an admin.</p>
    </section>
    <section>
      <p>Operators: 
        <span v-if="operators.length">{{ operators }}</span>
        <span v-else>You haven't joined any organizations yet. Add one?</span>
      </p>
    </section>
    <section class="border-t-2 border-blue">
      <p>Lesson Scores: </p>
      <div class="score m-auto w-5/6 flex flex-row" v-for="lesson in lessonScores" :key="lesson.lesson._id">
        <p class="mr-auto self-start">{{ lesson.lesson.title }}</p>
        <p class="ml-auto self-end">{{ lesson.score }}%</p>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      updatePasswordModal: false,
    }
  },
  computed: {
    ...mapGetters('user', [
      "name", 
      "email", 
      "operators", 
      "lessonScores", 
      "isAdmin"
    ])
  }
};
</script>
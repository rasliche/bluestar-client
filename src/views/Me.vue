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
      <p>
        Operators:
        <span v-if="operators.length">{{ operators }}</span>
        <span v-else>You haven't joined any organizations yet. Add one?</span>
      </p>
    </section>
    <section class="border-t-2 border-blue">
      <p>Lesson Scores:</p>
      <div v-if="status === 'loading'">
        <div>
          <p>Loading...</p>
        </div>
      </div>
      <div v-if="status === 'success'">
        <div
          v-for="score in userScores"
          :key="score._id"
          class="score m-auto w-5/6 flex flex-row"
        >
          <p class="mr-auto self-start">{{ score.lesson.title }}</p>
          <p class="ml-auto self-end">{{ score.score }}%</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import Api from '@/services/Api'

export default {
  data() {
    return {
      status: 'loading', // success, failure
      updatePasswordModal: false,
      userScores: undefined
    }
  },
  computed: {
    ...mapGetters('user', [
      'userId',
      'name',
      'email',
      'operators',
      'lessonScores',
      'isAdmin'
    ])
  },
  async created() {
    const response = await Api.get(`user/${this.userId}/scores`)
    this.status = 'success'
    this.userScores = response.data
  }
}
</script>

<template>
  <main class="user-dashboard">
    <h1 class="page-heading">
      Dashboard
    </h1>
    <section>
      <p class="text-2xl">{{ user.name }}</p>
      <p>{{ user.email }}</p>
      <p v-if="user.isAdmin">You are an admin.</p>
    </section>
    <section>
      <p>
        Operators:
        <span v-if="user.operators && user.operators.length">{{
          user.operators
        }}</span>
        <span v-else>You haven't joined any organizations yet. Add one?</span>
      </p>
    </section>
    <section class="border-t-2 border-blue">
      <p>Lesson Scores:</p>
      <div v-if="user.lessonScores">
        <span
          v-for="lesson in user.lessonScores"
          :key="lesson._id"
          class="score m-auto w-5/6 flex flex-row"
        >
          <p class="mr-auto self-start">{{ lesson.lesson.title }}</p>
          <p class="ml-auto self-end">{{ lesson.score }}%</p>
        </span>
      </div>
    </section>
  </main>
</template>

<script>
import Api from '@/services/Api'
import { mapGetters } from 'vuex'

export default {
  props: {
    userId: { type: String }
  },
  data() {
    return {
      user: {},
      updatePasswordModal: false
    }
  },
  computed: {
    userWithoutInternals() {
      const { _id, __v, ...restOfUser } = this.user
      return restOfUser
    }
    // ...mapGetters('user', [
    //   "name",
    //   "email",
    //   "operators",
    //   "lessonScores",
    //   "isAdmin"
    // ])
  },
  async created() {
    const { data: user } = await Api.get(`/users/${this.userId}`)
    this.user = { ...user }
  }
}
</script>

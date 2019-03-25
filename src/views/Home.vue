<template>
  <div class="home">
    <TrainingHome />
  </div>
</template>

<script>
// @ is an alias to /src
import TrainingHome from '@/views/lessons/TrainingHome.vue'
import { mapState } from 'vuex'

export default {
  name: "home",
  components: {
    TrainingHome
  },
  computed: {
    ...mapState('user', {
      user: 'user'
    }),
    ...mapState('quiz', {
      quiz: 'quiz'
    }),
  }
}
</script>

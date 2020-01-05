<template>
  <main>
    <h1 class="page-heading">
      Training Modules
    </h1>
    <!-- TODO: Allow cards to be filtered -->
    <div class="flex flex-wrap justify-center">
      <BSLessonCard
        v-for="lesson in publishedLessons"
        :key="lesson._id"
        :lesson="lesson"
      />
    </div>
  </main>
</template>

<script>
import Api from '@/services/Api'
import BSLessonCard from '@/components/lesson/BSLessonCard.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    BSLessonCard
  },
  data() {
    return {
      lessons: []
    }
  },
  async created() {
    const { data } = await Api.get('/lessons')
    this.lessons = data
  },
  computed: {
    publishedLessons() {
      const publishedLessons = this.lessons.filter(l => l.published === true)
      return publishedLessons
    }
  }
}
</script>

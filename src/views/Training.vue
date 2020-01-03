<template>
  <div class="flex flex-wrap">
    <!-- TODO: Allow cards to be filtered -->
    <BSLessonCard
      v-for="lesson in publishedLessons"
      :key="lesson._id"
      :title="lesson.title"
      :description="lesson.description"
      :programs="lesson.programs"
      :id="lesson._id"
    />
  </div>
</template>

<script>
import Api from '@/services/Api'
import BSLessonCard from "@/components/lesson/BSLessonCard.vue";
import { mapGetters, } from "vuex"

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
    const { data } = await Api.get('/lessons');  
    this.lessons = data;
  },
  computed: {
    publishedLessons() {
      const publishedLessons = this.lessons.filter(l => l.published === true)
      return publishedLessons
    }
  }
};
</script>

<template>
  <div class="flex flex-wrap">
    <!-- TODO: Allow cards to be filtered -->
    <BSLessonCard
      v-for="lesson in lessons"
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
  async beforeRouteEnter (to, from, next) {
    const { data } = await Api.get('/lessons?programs=true');
    next(vm => {
      // access to component instance via `vm`
      vm.$data.lessons = data
    })
  },
  // async created() {
    
  //   this.lessons = data;
  // },
  computed: {
    
  }
};
</script>

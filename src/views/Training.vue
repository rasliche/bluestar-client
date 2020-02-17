<template>
  <main>
    <h1 class="page-heading">
      Training Modules
    </h1>
    <!-- TODO: Allow cards to be filtered -->
    <div class="flex flex-wrap justify-center">
      <ButtonPrimary @click="selectedProgramId = null">
        All
      </ButtonPrimary>
      <ButtonPrimary 
        @click="selectedProgramId = program._id"
        v-for="program in programs" :key="program._id"
      >
        {{ program.name }}
      </ButtonPrimary>
    </div>
    <div class="flex flex-wrap justify-center">
      <BSLessonCard
        v-for="lesson in filteredLessons"
        :key="lesson._id"
        :lesson="lesson"
      />
    </div>
  </main>
</template>

<script>
import Api from '@/services/Api'
import BSLessonCard from '@/components/lesson/BSLessonCard'
import ButtonPrimary from '@/components/BaseUI/ButtonPrimary'

export default {
  name: 'Training',
  components: {
    BSLessonCard,
    ButtonPrimary
  },
  data() {
    return {
      lessons: [],
      programs: [],
      selectedProgramId: null
    }
  },
  computed: {
    filteredLessons() {
      if (this.selectedProgramId === null) { return this.lessons }
      return this.lessons.filter(lesson => lesson.programs.includes(this.selectedProgramId))
    }
  },
  async created() {
    const { data: lessons } = await Api.get('/published-lessons')
    this.lessons = lessons
    const { data: programs } = await Api.get('/programs')
    this.programs = programs
  }
}
</script>

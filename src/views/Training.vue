<template>
  <main>
    <PageHeading>Training Modules</PageHeading>
    <!-- TODO: Allow cards to be filtered -->
    <div class="flex flex-wrap justify-center">
      <ButtonPrimary 
        class="mx-2 w-32"
        @click="selectedProgramId = null"
      >
        All
      </ButtonPrimary>
      <ButtonPrimary 
        class="mx-2 w-32"
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
import { PageHeading, ButtonPrimary } from '@/components/BaseUI'
import BSLessonCard from '@/components/lesson/BSLessonCard'

export default {
  name: 'Training',
  components: {
    BSLessonCard,
    ButtonPrimary,
    PageHeading
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

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
import { PageHeading, ButtonPrimary } from '@/components/BaseUI'
import BSLessonCard from '@/components/lesson/BSLessonCard'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Training',
  components: {
    BSLessonCard,
    ButtonPrimary,
    PageHeading
  },
  data() {
    return {
      selectedProgramId: null
    }
  },
  created() {
    this.$store.dispatch('lesson/getLessons')
      .catch(e => {
        console.log(e)
      })
    this.$store.dispatch('program/getPrograms')
  },
  computed: {
    ...mapState('program', ['programs']),
    ...mapGetters('lesson', ['publishedLessons']),
    filteredLessons() {
      if (this.selectedProgramId === null) { return this.publishedLessons }
      return this.publishedLessons.filter(lesson => lesson.programs.includes(this.selectedProgramId))
    }
  },
}
</script>

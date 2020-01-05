<template>
  <BaseCard class="w-64 mt-4 mx-2 rounded shadow">
    <router-link 
      tag="div" 
      :to="{ name: 'view-lesson', params: { lessonId: lesson._id } }" 
      class="cursor-pointer">
      <img
        class="h-48 w-auto"
        :src="lesson.coverPhoto.location"
        :alt="lesson.coverPhoto.altDescription"
      />
      <div class="text-center font-bold text-lg">{{ lesson.title }}</div>
    </router-link>
    <p class="text-grey-darker text-sm">
      {{ lesson.description }}
    </p>
    <div v-if="lesson.programs.length" class="px-6 py-4">
      <span
        v-for="program in lesson.programs"
        :key="program._id"
        class="inline-block bg-blue-lighter rounded-full px-3 py-1 text-xs font-semibold tracking-wide text-grey-darker">
          {{ program.name }}
        </span>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseUI/BaseCard'

export default {
    name: 'BSLessonCard',
    components: {
      BaseCard,
    },
    props: {
      lesson: {
        _id: String,
        title: String,
        programs: Array, 
        description: String,
        coverPhoto: {
          location: {
            type: String,
            default: 'https://floridakeys.noaa.gov/onthewater/bs_logomed.jpg'
          },
          altDescription: String,
        },
      },
    }
}
</script>

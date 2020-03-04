<template>
  <CardBase class="w-64 mt-4 mx-2 rounded shadow">
    <router-link
      tag="div"
      :to="{ name: 'view-lesson', params: { lessonId: lesson._id } }"
      class="cursor-pointer"
    >
      <img
        class="h-48 w-auto"
        :src="lesson.coverPhoto.location"
        :alt="lesson.coverPhoto.altDescription"
      />
    </router-link>
    <div class="h-24 p-2">
      <div class="h-12 text-center font-bold text-lg">{{ lesson.title }}</div>
      <p class="h-10 text-gray-700 text-sm">
        {{ lesson.description }}
      </p>
    </div>
  </CardBase>
</template>

<script>
import CardBase from '@/components/BaseUI/CardBase'

export default {
  name: 'BSLessonCard',
  components: {
    CardBase
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
        altDescription: String
      }
    }
  }
}
</script>

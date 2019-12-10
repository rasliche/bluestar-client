<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg m-2">
    <router-link tag="div" :to="{ name: 'view-lesson', params: { lessonId } }" class="px-6 py-4 cursor-pointer">
      <img
        class="w-full object-cover"
        :src="thumbnail"
        alt=""
      />
      <div class="font-bold text-xl mb-2">{{ title }}</div>
      <p class="text-grey-darker text-base">
        {{ description }}
      </p>
    </router-link>
    <div v-if="programs.length" class="px-6 py-4">
      <span
        v-for="program in programs"
        :key="program"
        class="inline-block bg-blue-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
          #{{ program }}
        </span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'BSLessonCard',
    props: {
      lessonId: String,
      title: String,
      programs: Array, 
      thumbnail: {
        type: String,
        default: 'https://floridakeys.noaa.gov/onthewater/bs_logomed.jpg'
      }, 
      description: String
    }
}
</script>

<style scoped></style>

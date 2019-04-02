<template>
    <nav>
        <!-- TODO: iterate through training children -->
        <router-link :to="{ name: 'training'}">Training Home</router-link>
        <router-link v-for="lesson in lessons" :to="{ name: lesson.name}" :key="lesson.name">{{ lesson.name }}</router-link>
    </nav>
</template>

<script>
import lessons from '@/helpers/lessons.js'
import LessonCard from '@/components/LessonCard.vue'

export default {
    data() {
        return {
            lessons
        }
    }
    
}
</script>


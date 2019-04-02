<template>
    <div>
        <LessonCard v-for="lesson in lessons" :to="{ name: lesson.name}" :key="lesson.name" />
    </div>
</template>

<script>
import lessons from '@/helpers/lessons'
import LessonCard from '@/components/LessonCard.vue'

export default {
    data() {
        return {
            lessons
        }
    },
    components: {
        LessonCard
    }
}
</script>

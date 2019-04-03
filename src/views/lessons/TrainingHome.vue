<template>
    <div class="flex flex-wrap">
        <LessonCard 
            class="m-2"
            v-for="lesson in lessons" 
            :key="lesson.name" 
            :name="lesson.name" 
            :tags="lesson.tags" 
            :path="lesson.path" />
    </div>
</template>

<script>
import LessonCard from '@/components/LessonCard.vue'

export default {
    components: {
        LessonCard
    },
    data() {
        return {
        }
    }
}
</script>
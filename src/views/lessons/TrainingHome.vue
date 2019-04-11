<template>
    <div class="flex flex-wrap">
        <LessonCard v-for="lesson in lessons"
            :key="lesson._id" 
            :title="lesson.title"
            :description="lesson.description"
            :programs="lesson.programs" 
            :slug="lesson.slug" />
    </div>
</template>

<script>
import Api from '@/services/Api'
import LessonCard from '@/components/lesson/LessonCard.vue'

export default {
    components: {
        LessonCard
    },
    data() {
        return {
            lessons: []
        }
    },
    async mounted() {
        const { data } = await Api.get('/lessons')
        this.lessons = data
    }

}
</script>
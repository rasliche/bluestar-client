<template>
    <div class="flex flex-wrap">
        <BSLessonCard v-for="lesson in lessons"
            :key="lesson._id" 
            :title="lesson.title"
            :description="lesson.description"
            :programs="lesson.programs" 
            :slug="lesson.slug"
            class="flex-1" />
    </div>
</template>

<script>
import Api from '@/services/Api'
import BSLessonCard from '@/components/lesson/BSLessonCard.vue'

export default {
    components: {
        BSLessonCard
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

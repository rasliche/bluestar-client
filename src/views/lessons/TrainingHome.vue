<template>
    <div class="flex flex-wrap">
        <LessonCard
            key="about-fknms" 
            title="About FKNMS"
            description="FKNMS is a large marine protected area."
            :programs="['diving', 'fishing']" 
            slug="about-fknms" />
    </div>
</template>

<script>
import LessonCard from '@/components/lesson/LessonCard.vue'

export default {
    components: {
        LessonCard
    },
}
</script>
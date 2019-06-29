<template>
    <div class="flex flex-wrap">
        <LessonCard
            key="about-fknms" 
            title="About FKNMS"
            description="FKNMS is a large marine protected area."
            :programs="['diving', 'fishing']" 
            slug="about-fknms" />
        <LessonCard
            key="regulations-and-zones" 
            title="Regulations and Zones"
            description="Know the different rules that apply to different zones."
            :programs="['diving', 'fishing']" 
            slug="regulations-and-zones" />
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
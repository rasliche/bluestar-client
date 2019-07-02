<template>
  <div class="flex flex-wrap">
    <BSLessonCard
      key="about-fknms"
      title="About FKNMS"
      description="FKNMS is a large marine protected area."
      :programs="['diving', 'fishing']"
      slug="about-fknms"
    />
    <BSLessonCard
      key="regulations-and-zones"
      title="Regulations and Zones"
      description="Know the different rules that apply to different zones."
      :programs="['diving', 'fishing']"
      slug="regulations-and-zones"
    />
  </div>
</template>

<script>
import BSLessonCard from "@/components/lesson/BSLessonCard.vue";
export default {
  components: {
    BSLessonCard
  }
};
</script>
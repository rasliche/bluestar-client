<template>
  <div class="flex flex-wrap">
    <BSLessonCard
      key="about-fknms"
      title="About FKNMS"
      thumbnail="https://res.cloudinary.com/duzmgsio4/image/upload/v1554164243/fknms-bluestar/about-fknms/mangroves.jpg"
      description="FKNMS is a large marine protected area."
      :programs="['diving', 'fishing']"
      slug="about-fknms"
    />
    <BSLessonCard
      key="regulations-and-zones"
      title="Regulations and Zones"
      thumbnail="https://res.cloudinary.com/duzmgsio4/image/upload/v1562004372/regulations-and-zones/intro.jpg"
      description="Know the different rules that apply to different zones."
      :programs="['diving', 'fishing']"
      slug="regulations-and-zones"
    />
    <BSLessonCard
      key="reef-etiquette"
      title="Reef Etiquette"
      description="Your actions on and off the water can have positive or negative effects on the reef community."
      :programs="['diving',]"
      slug="reef-etiquette"
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
<template>
  <div class="training">
    <TrainingNav v-if="this.$route.name !== 'training'" />
    <router-view></router-view>
  </div>
</template>

<script>
import TrainingNav from "@/components/TrainingNav.vue";

export default {
  components: {
  async beforeRouteEnter (to, from, next) {
    const { data } = await Api.get('/lessons');
    next(vm => {
      // access to component instance via `vm`
      vm.$data.lessons = data
    })
  },
  }
};
</script>

<template>
  <div class="training">
    <TrainingNav v-if="this.$route.name !== 'training'" />
    <router-view></router-view>
  </div>
</template>

<script>
import TrainingNav from '@/components/TrainingNav.vue'

export default {
  components: {
    TrainingNav,
  }
}
</script>
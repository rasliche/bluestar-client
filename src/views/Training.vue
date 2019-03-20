<template>
  <div class="training">
    <TrainingNav />
    <router-view></router-view>
  </div>
</template>

<script>
import TrainingNav from '@/components/TrainingNav.vue'

export default {
  components: {
    TrainingNav
  }
}
</script>
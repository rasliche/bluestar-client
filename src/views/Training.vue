<template>
  <div class="training flex">
    <training-nav class="w-1/6" />
    <router-view class="w-5/6"></router-view>
  </div>
</template>

<script>
import TrainingNav from '@/components/TrainingNav.vue'

export default {
  components: {
    'training-nav': TrainingNav
  }
}
</script>
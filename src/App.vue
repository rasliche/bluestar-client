<template>
  <div id="app" class="flex">
    <AppNav class="w-1/6 h-screen" />
    <router-view class="w-5/6" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AppNav from '@/components/AppNav.vue'

export default {
  components: {
    AppNav
  },
  methods: {
    ...mapActions([
      'fetchAllOperators'
    ])
  },
  mounted() {
    this.fetchAllOperators()
  }
}
</script>

<style src="./styles/styles.css"></style>

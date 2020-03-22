<template>
  <div id="app" class="antialiased text-gray-800 bg-gray-100">
    <AppNav />

    <router-view class="max-w-4xl mx-auto min-h-screen px-4 pt-2"></router-view>

    <AppFooter />

    <!-- Notifications and Portals -->
    <portal-target name="modals"></portal-target>
    <NotificationContainer />
  </div>
</template>

<script>
import AppNav from '@/components/AppNav.vue'
import AppFooter from '@/components/AppFooter.vue'
import { NotificationContainer } from '@/components/BaseComponents'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('alert')

export default {
  components: {
    AppNav,
    AppFooter,
    NotificationContainer
  },
  computed: {
    ...mapState(['alert', 'timer'])
  }
}
</script>

<style src="./styles/accessibility.css"></style>
<style src="./styles/styles.css"></style>
<style src="./styles/transitions.css"></style>

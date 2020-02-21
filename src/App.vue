<template>
  <div id="app" class="antialiased text-grey-darkest bg-grey-lightest">
    <AppNav />

    <router-view class="max-w-lg mx-auto px-4 pt-2"></router-view>

    <AppFooter />

    <!-- Notifications and Portals -->
    <portal-target name="modals"></portal-target>
    <transition name="alert-slide">
      <Alert v-if="alert.type" :type="alert.type" :text="alert.text"></Alert>
    </transition>
  </div>
</template>

<script>
import AppNav from '@/components/AppNav.vue'
import AppFooter from '@/components/AppFooter.vue'
import Alert from '@/components/Alert/Alert.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('alert')

export default {
  components: {
    AppNav,
    AppFooter,
    Alert
  },
  computed: {
    ...mapState(['alert', 'timer'])
  }
}
</script>

<style src="./styles/accessibility.css"></style>
<style src="./styles/styles.css"></style>
<style src="./styles/transitions.css"></style>

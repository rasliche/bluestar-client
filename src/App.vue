<template>
  <div id="app">
    <AppHeader id="head" />

    <AppNav id="nav" />

    <router-view id="main" />

    <AppFooter id="foot" />

    <portal-target name="modals"></portal-target>
    <transition name="alert-slide">
      <Alert v-if="alert.type" :type="alert.type" :text="alert.text"></Alert>
    </transition>
  </div>
</template>

<script>
import AppNav from "@/components/AppNav.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import Alert from "@/components/Alert.vue";
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('alert')

export default {
  components: {
    AppNav,
    AppHeader,
    AppFooter,
    Alert
  },
  created() {
    this.$store.dispatch("auth/tryAutoLogin");
  },
  computed: {
    ...mapState(['alert', 'timer'])
  }
};
</script>

<style>
#app {
  display: grid;
  grid-template-areas:
    "head head"
    "nav main"
    "nav foot";
  grid-template-rows: 50px 1fr 30px;
  grid-template-columns: 150px 1fr;
}

#app > #head {
  grid-area: head;
}

#app > #nav {
  grid-area: nav;
}

#app > #foot {
  grid-area: foot;
}

#app > #main {
  grid-area: main;
}
</style>

<style src="./styles/styles.css"></style>
<style src="./styles/transitions.css"></style>

<template>
  <div id="app">
    <AppHeader id="head" />

    <AppNav id="nav" />

    <router-view id="main" />

    <AppFooter id="foot" />

    <transition name="alert-slide">
      <BSFlashMessage v-if="type" :type="type" :text="text"></BSFlashMessage>
    </transition>
  </div>
</template>

<script>
import AppNav from "@/components/AppNav.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('alert')

export default {
  components: {
    AppNav,
    AppHeader,
    AppFooter,
  },
  created() {
    this.$store.dispatch("tryAutoLogin");
  },
  computed: {
    ...mapState(['type', 'text'])
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

/* transitions */
.alert-slide-enter-active,
.alert-slide-leave-active {
  transition: all 1s;
}

.alert-slide-enter {
  opacity: 0;
  transform: translateY(100px)
}

.alert-slide-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.alert-slide-enter-to,
.alert-slide-leave {
  opacity: 1;
  transform: translateX(0px);
}

.alert-slide-fast-enter-active,
.alert-slide-fast-leave-active {
  transition: opacity 0.25s;
}

.alert-slide-fast-enter,
.alert-slide-fast-leave-to {
  opacity: 0;
}
</style>

<style src="./styles/styles.css"></style>

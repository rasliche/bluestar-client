<template>
  <div id="app" class="px-6">
    <AppNav />
    <router-view />
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


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<style src="./styles/styles.css"></style>

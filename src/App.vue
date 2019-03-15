<template>
  <div id="app" class="px-6">
    <div id="nav" class="py-4">
      <router-link to="/">Home</router-link> |
      <router-link to="/news">News</router-link> |
      <router-link to="/training">Training</router-link> |
      <router-link to="/admin">Admin</router-link> |
      <router-link to="/operators">Operators</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
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

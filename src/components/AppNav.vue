<template>
  <nav class="md:flex md:justify-between bg-blue-800 md:px-4 md:py-2">
    <div class="flex items-center justify-between px-4 py-2 md:p-0">
      <!-- Desktop Logo -->
      <div class="flex items-center flex-shrink-0 md:mr-6 text-blue-200">
        <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
        <router-link :to="{ name: 'home' }" class="text-3xl text-blue-100" active-class="">
          Blue Star
        </router-link>
      </div>

      <!-- Responsive Menu Button -->
      <div class="md:hidden">
        <button @click="isOpen = !isOpen" class="block p-2 border rounded text-blue-400 focus:text-white hover:text-white focus:outline-none">
          <svg class="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Menu</title>
            <path v-if="!isOpen" fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
            <path v-else fill-rule="evenodd" d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"></path>
          </svg>
        </button>
      </div>
    </div>

    <div :class="isOpen ? 'block' : 'hidden'" class="md:block w-full flex-grow px-2 pb-4 md:pb-0 md:flex md:items-center md:w-auto">
      <div class="md:flex-grow">
        <router-link v-if="isAuthenticated" :to="{ name: 'training' }" class="block p-2 mt-2 mr-4 md:inline-block md:mt-0 text-blue-400 rounded hover:bg-blue-100">
          Training
        </router-link>
        <router-link :to="{ name: 'news' }" class="block p-2 mt-2 mr-4 md:inline-block md:mt-0 text-blue-400 rounded hover:bg-blue-100">
          News
        </router-link>
        <router-link v-if="user && user.isAdmin" :to="{ name: 'admin' }" class="block p-2 mt-2 mr-4 md:inline-block md:mt-0 text-blue-400 rounded hover:bg-blue-100">
          Admin
        </router-link>
        <router-link v-if="user && user.isAdmin" :to="{ name: 'design' }" class="block p-2 mt-2 mr-4 md:inline-block md:mt-0 text-blue-400 rounded hover:bg-blue-100">
          Design
        </router-link>
      </div>

      <div class="w-full inline-block md:items-center md:w-auto">
        <router-link v-if="isAuthenticated" :to="{ name: 'me' }" class="block p-2 mt-2 mr-4 md:inline-block md:mt-0 text-blue-400 rounded hover:bg-blue-100">
          {{ user ? user.name : '' }}
        </router-link>
        <router-link v-if="!isAuthenticated" :to="{ name: 'login' }" class="block p-2 mt-2 mr-4 md:inline-block md:mt-0 text-blue-400 rounded hover:bg-blue-100">
          Login
        </router-link>
        <button v-if="isAuthenticated" @click="logoutUser" class="block p-2 mt-2 mr-4 md:inline-block md:mt-0 text-blue-400 rounded hover:bg-blue-100">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppNav',
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapState('user', ['user'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser'])
  },
  watch: {
    $route(to, from) {
        this.isOpen = false
    },
  }
}
</script>

<style lang="postcss" scoped>
a.router-link-active {
  @apply text-blue-100 bg-blue-600 rounded;
}
</style>

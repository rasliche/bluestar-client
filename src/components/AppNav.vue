<template>
  <nav class="flex items-center justify-between flex-wrap p-4 bg-blue-darker">
    <!-- Desktop Logo -->
    <div class="flex items-center flex-no-shrink text-white mr-6">
      <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
      <router-link
        to="/"
        class="text-3xl text-blue-lightest no-underline"
        active-class="">
          Blue Star
      </router-link>
    </div>
    <!-- Responsive Menu -->
    <div class="block lg:hidden">
      <button class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>
    
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="lg:flex-grow">
        <router-link
          v-if="isAuthenticated"
          :to="{ name: 'training' }"
          class="block p-2 mt-3 mr-4 lg:inline-block lg:mt-0 no-underline text-blue-light rounded hover:bg-blue-lightest">
            Training
        </router-link>
        <router-link 
          :to="{ name: 'news' }" 
          class="block p-2 mt-3 mr-4 lg:inline-block lg:mt-0 no-underline text-blue-light rounded hover:bg-blue-lightest">
            News
        </router-link>
        <router-link
          v-if="isAdmin"
          :to="{ name: 'admin' }"
          class="block p-2 mt-3 mr-4 lg:inline-block lg:mt-0 no-underline text-blue-light rounded hover:bg-blue-lightest">
            Admin
        </router-link>
      </div>

      <div class="w-full inline-block px-4 lg:items-center lg:w-auto">
        <router-link 
          v-if="!isAuthenticated" 
          to="/login" 
          class="p-2 mt-3 ml-4 no-underline text-blue-light rounded hover:bg-blue-lightest">
            Login
        </router-link>
        <router-link
          v-if="isAuthenticated"
          :to="{ name: 'me' }"
          class="p-2 mt-3 ml-4 no-underline text-blue-light rounded hover:bg-blue-lightest">
            Me
        </router-link>
        <a 
          v-if="isAuthenticated" 
          @click="logout" 
          class="p-2 mt-3 ml-4 no-underline text-blue-light rounded hover:bg-blue-lightest cursor-pointer">
            Logout
        </a>
      </div>
    </div>

  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters('auth', {
      isAuthenticated: "isAuthenticated",
    }),
    ...mapGetters('user', { 
      isAdmin: "isAdmin",
    }),
  },
  methods: {
    ...mapActions('auth', {
      logout: "logoutUser"
    })
  }
};
</script>

<style lang="postcss" scoped>
a.router-link-active {
  @apply text-blue-lightest bg-blue-dark rounded;
}
</style>

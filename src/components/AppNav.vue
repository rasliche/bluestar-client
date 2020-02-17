<template>
  <nav
    id="app-nav"
    class="flex items-center justify-between flex-wrap p-4 bg-blue-darker"
  >
    <!-- Desktop Logo -->
    <div class="flex items-center flex-no-shrink mr-6 text-blue-lighter">
      <svg
        class="fill-current h-8 w-8 mr-2"
        width="54"
        height="54"
        viewBox="0 0 54 54"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
        />
      </svg>
      <router-link
        to="/"
        class="text-3xl text-blue-lightest no-underline"
        active-class=""
      >
        Blue Star
      </router-link>
    </div>

    <!-- Responsive Menu Button -->
    <div class="block md:hidden">
      <button
        class="flex items-center px-2 py-2 border rounded text-blue-light"
        @click="showNavMenu = !showNavMenu"
      >
        <svg
          class="h-8 w-8 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <title>Menu</title>
          <path
            v-if="!showNavMenu"
            fill-rule="evenodd"
            d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
          ></path>
          <path
            v-else
            fill-rule="evenodd"
            d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
          ></path>
        </svg>
      </button>
    </div>

    <!-- <transition name="tray" v-if="showNavMenu" mode="in-out" appear> -->
    <div class="w-full block flex-grow md:flex md:items-center md:w-auto">
      <div class="md:flex-grow">
        <router-link
          v-if="isAuthenticated"
          :to="{ name: 'training' }"
          class="block p-2 mt-3 mr-4 md:inline-block md:mt-0 no-underline text-blue-light rounded hover:bg-blue-lightest"
        >
          Training
        </router-link>
        <router-link
          :to="{ name: 'news' }"
          class="block p-2 mt-3 mr-4 md:inline-block md:mt-0 no-underline text-blue-light rounded hover:bg-blue-lightest"
        >
          News
        </router-link>
        <router-link
          v-if="isAdmin"
          :to="{ name: 'admin' }"
          class="block p-2 mt-3 mr-4 md:inline-block md:mt-0 no-underline text-blue-light rounded hover:bg-blue-lightest"
        >
          Admin
        </router-link>
        <router-link
          v-if="isAdmin"
          :to="{ name: 'design' }"
          class="block p-2 mt-3 mr-4 md:inline-block md:mt-0 no-underline text-blue-light rounded hover:bg-blue-lightest"
        >
          Design
        </router-link>
      </div>

      <div class="w-full inline-block md:items-center md:w-auto">
        <router-link
          v-if="!isAuthenticated"
          to="/login"
          class="block p-2 mt-3 mr-4 md:inline-block md:mt-0 no-underline text-blue-light rounded hover:bg-blue-lightest"
        >
          Login
        </router-link>
        <router-link
          v-if="isAuthenticated"
          :to="{ name: 'me' }"
          class="block p-2 mt-3 mr-4 md:inline-block md:mt-0 no-underline text-blue-light rounded hover:bg-blue-lightest"
        >
          Me
        </router-link>
        <button
          v-if="isAuthenticated"
          class="block p-2 mt-3 mr-4 md:inline-block md:mt-0 no-underline text-blue-light rounded hover:bg-blue-lightest"
          @click="logoutUser"
        >
          Logout
        </button>
      </div>
    </div>
    <!-- </transition> -->
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppNav',
  data() {
    return {
      showNavMenu: false
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapGetters('user', ['isAdmin'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser'])
  },
  watch: {
    $route(to, from) {
        this.showNavMenu = false
    },
  }
}
</script>

<style lang="postcss" scoped>
a.router-link-active {
  @apply text-blue-lightest bg-blue-dark rounded;
}
</style>

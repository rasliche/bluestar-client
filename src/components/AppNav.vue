<template>
  <nav class="flex flex-col p-2 bg-blue-darker min-h-screen text-center">
    <router-link 
      v-if="!isAuthenticated" 
      to="/login" 
      class="mt-3 no-underline text-blue-light rounded hover:bg-blue-lightest">
        Login
      </router-link>
    <router-link
      v-if="isAuthenticated"
      :to="{ name: 'training' }"
      class="mt-3 no-underline text-blue-light rounded hover:bg-blue-lightest">
        Training
        </router-link>
    <router-link
      v-if="isAuthenticated"
      :to="{ name: 'me' }"
      class="mt-3 no-underline text-blue-light rounded hover:bg-blue-lightest">
      Me
      </router-link>
    <!-- <router-link :to="{ name: 'news' }" class="pl-10 mt-10 no-underline text-blue-light">News</router-link> -->
    <router-link
      v-if="isAdmin"
      :to="{ name: 'admin' }"
      class="mt-3 no-underline text-blue-light rounded hover:bg-blue-lightest">
      Admin
      </router-link>

    <a 
    v-if="isAuthenticated" 
    @click="logout" 
    class="mt-3 no-underline text-blue-light rounded hover:bg-blue-lightest cursor-pointer">
      Logout
      </a>
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

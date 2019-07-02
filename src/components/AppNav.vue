<template>
  <nav class="flex flex-col bg-blue-darker min-h-screen">
    <router-link 
      v-if="!isAuthenticated" 
      to="/login" 
      class="pl-10 mt-3 no-underline text-blue-light">
        Login
      </router-link>
    <router-link
      v-if="isAuthenticated"
      :to="{ name: 'training' }"
      class="pl-10 mt-3 no-underline text-blue-light">
        Training
        </router-link>
    <router-link
      v-if="isAuthenticated"
      :to="{ name: 'me' }"
      class="pl-10 mt-3 no-underline text-blue-light"
      >Me</router-link
    >
    <!-- <router-link :to="{ name: 'news' }" class="pl-10 mt-10 no-underline text-blue-light">News</router-link> -->
    <router-link
      v-if="isAdmin"
      :to="{ name: 'admin' }"
      class="pl-10 mt-3 no-underline text-blue-light"
      >Admin</router-link
    >

    <a v-if="isAuthenticated" @click="logout" class="pl-10 mt-3 no-underline text-blue-light"
      >Logout</a
    >
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isAdmin: "isAdmin",
      isAuthenticated: "isAuthenticated"
    })
  },
  methods: {
    ...mapActions({
      logout: "logout"
    })
  }
};
</script>

<style lang="postcss" scoped>
a.router-link-active {
  @apply text-blue-lightest pl-6;
}
</style>

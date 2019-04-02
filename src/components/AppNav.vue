<template>
    <div class="flex flex-col bg-blue-darker min-h-screen">
      <!-- <router-link to="/news" class="pl-10 mt-10 no-underline text-blue-light">News</router-link> -->
      <router-link to="/training" class="pl-10 mt-3 no-underline text-blue-light">Training</router-link>
      <!-- <router-link v-if="auth" to="/operators" class="pl-10 mt-3 no-underline text-blue-light">Operators</router-link> -->
      <!-- <router-link to="/about" class="pl-10 mt-3 no-underline text-blue-light">About</router-link> -->
      <router-link v-if="admin" to="/admin" class="pl-10 mt-3 no-underline text-blue-light">Admin</router-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      auth: 'isAuthenticated',
      admin: 'isAdmin'
    })
  }
}
</script>

<style lang="postcss" scoped>
  a.router-link-active {
    @apply text-blue-lightest pl-6;
  }
</style>

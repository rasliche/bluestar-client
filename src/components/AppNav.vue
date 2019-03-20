<template>
    <div class="flex flex-col bg-blue-darker">
      <!-- <router-link to="/news" class="pl-10 mt-10 no-underline text-blue-light">News</router-link> -->
      <router-link to="/training" class="pl-10 mt-3 no-underline text-blue-light">Training</router-link>
      <!-- <router-link to="/operators" class="pl-10 mt-3 no-underline text-blue-light">Operators</router-link> -->
      <!-- <router-link to="/about" class="pl-10 mt-3 no-underline text-blue-light">About</router-link> -->
      <router-link to="/admin" class="pl-10 mt-3 no-underline text-blue-light">Admin</router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="postcss" scoped>
  a.router-link-active {
    @apply text-blue-lightest pl-6;
  }
</style>

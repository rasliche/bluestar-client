<template>
    <div id="nav" class="flex flex-col bg-blue-darker">
      <router-link to="/" class="text-center py-4 text-3xl bg-blue-darkest text-blue-lightest no-underline">Blue Star</router-link>
      <router-link to="/news" class="ml-10 mt-10 no-underline text-blue-light">News</router-link>
      <router-link to="/training" class="ml-10 mt-3 no-underline text-blue-light">Training</router-link>
      <router-link to="/operators" class="ml-10 mt-3 no-underline text-blue-light">Operators</router-link>
      <router-link to="/about" class="ml-10 mt-3 no-underline text-blue-light">About</router-link>
      <router-link to="/admin" class="ml-10 mt-3 no-underline text-blue-light">Admin</router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style>
a.router-link-active {
  @apply text-blue-lightest ml-6;
}
</style>

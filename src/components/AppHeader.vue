<template>
    <div class="flex">
      <router-link to="/" class="text-3xl bg-blue-darkest text-blue-lightest no-underline">Blue Star</router-link>
      <router-link to="/login" class="bg-blue-darkest text-blue-lightest">Login</router-link>
      {{ user }}
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('user', {
      user: 'user'
    })
  }
}
</script>

<style>

</style>

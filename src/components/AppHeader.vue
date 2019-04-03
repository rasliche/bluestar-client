<template>
    <div class="flex bg-blue-darkest">
      <router-link to="/" class="text-3xl ml-4 mt-2 text-blue-lightest no-underline">Blue Star</router-link>
      <router-link v-if="!auth" to="/login" class="text-blue-lightest">Login</router-link>
      <router-link v-if="auth" to="/me" class="text-blue-lightest">Me</router-link>
      <button v-if="auth" @click="logout" class="text-blue-lightest">Logout</button>
      <div class="text-white" v-for="(record, index) in this.$route.matched" :key="index">
            <p>{{ index }}</p>
            <p>{{ record.name }}</p>
            <p>{{ record.meta }}</p>
            <p>{{ record.path }}</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      auth: 'isAuthenticated'
    })
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    })
  }
}
</script>

<style>

</style>

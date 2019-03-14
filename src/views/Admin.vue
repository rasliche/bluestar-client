<template>
  <div class="home">
    <h1>Admin Dashboard</h1>
    <div class="flex flex-wrap">
      <div class="w-1/2">
        <h3>Operators</h3>
        <CreateOperator />
        <p v-for="operator in operators" :key="operator._id">
          {{ operator.name }}
        </p>
      </div>
      <div class="w-1/2">
        <h3>Staff</h3>
      </div>
      <div class="w-1/2">
        <h3>Lessons</h3>
      </div>
      <div class="w-1/2">
        <h3>Quizzes</h3>
      </div>
      <div class="w-1/2">
        <h3>Blog Posts</h3>
      </div>
      <div class="w-1/2">
        <h3>Events</h3>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateOperator from "@/components/CreateOperator.vue"
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "home",
  components: {
    CreateOperator
  },
  computed: {
      ...mapGetters([
          'operators'
      ])
  },
  methods: {
      ...mapActions([
          'fetchAllOperators'
      ])
  },
  mounted() {
    this.fetchAllOperators()
  }
}
</script>

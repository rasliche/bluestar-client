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
        <h3>Users</h3>
        <UsersList :users="users" />
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
import axios from 'axios'
import CreateOperator from "@/components/CreateOperator.vue"
import UsersList from "@/components/UsersList.vue"
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "home",
  components: {
    CreateOperator,
    UsersList
  },
  data() {
    return {
      users: []
    }
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
  async created() {
    let users = await axios.get('http://localhost:3000/api/users')
    this.users = users.data
    this.fetchAllOperators()
  }
}
</script>

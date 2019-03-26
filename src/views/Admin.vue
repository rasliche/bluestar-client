<template>
  <div class="home">
    <h1>Admin Dashboard</h1>
    <div>
      <div>
        <h3>Operators</h3>
        <CreateOperator />
        <div v-for="operator in operators" :key="operator._id">
          <router-link :to="{ name: 'operator', params: { id: operator.slug }}">{{ operator.name }}</router-link>
        </div>
      </div>
      <div>
        <h3>Users</h3>
        <UsersList :users="users" />
      </div>
      <div>
        <h3>Lessons</h3>
      </div>
      <div>
        <h3>Quizzes</h3>
      </div>
      <div>
        <h3>Blog Posts</h3>
      </div>
      <div>
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
import { mapGetters } from 'vuex'

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
  async created() {
    const { data } = await axios.get('http://localhost:3000/api/users', {
      headers: {
        Authorization: `Bearer: ${this.$store.state.user.token}`
      }
    })
    this.users = data
  }
}
</script>

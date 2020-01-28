<template>
  <div>
    <h1>All Shops</h1>
    <div>
      <div v-for="operator in operators" :key="operator._id">
        <router-link
          :to="{ name: 'operator', params: { slug: operator.slug } }"
          >{{ operator.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import axios from 'axios'

export default {
  data() {
    return {
      operators: []
    }
  },
  async mounted() {
    try {
      const { data } = await axios.get('http://localhost:3000/api/operators', {
        headers: {
          Authorization: `Bearer: ${this.$store.state.user.token}`
        }
      })
      this.operators = data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style></style>

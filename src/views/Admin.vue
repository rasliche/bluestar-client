<template>
  <div class="home">
    <CreateOperator />
    <button @click="fetchAllOperators">Refresh Operator List</button>
    {{ operators }}
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

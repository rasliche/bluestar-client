<template>
  <div class="home">
    {{ user }}
    {{ quiz }}
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"
import { mapState } from 'vuex'

export default {
  name: "home",
  components: {
    HelloWorld,
  },
  computed: {
    ...mapState('user', {
      user: 'user'
    }),
    ...mapState('quiz', {
      quiz: 'quiz'
    }),
  }
}
</script>

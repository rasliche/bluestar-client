<template>
  <div class="home">
    <h1>Blue Star Training</h1>
    <p>Welcome to the Blue Star training. This training is required for your dive/snorkel shop to be recognized as a Blue Star operator.</p>
    <p>Please select your dive/snorkel shop from the drop down menu and enter your shop's password.</p>
    <Login />
    <Register />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'
import { mapState } from 'vuex'

export default {
  name: "home",
  components: {
    Login,
    Register,
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

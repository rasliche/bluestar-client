<template>
  <div class="home flex flex-wrap justify-center">
    <section class="w-5/6">
      <h1 class="border-blue-lighter border-b-4 mb-4 pt-4">Blue Star Training</h1>
      <p class="pt-4">
        Welcome to the Blue Star training. This training is required for your
        dive/snorkel shop to be recognized as a Blue Star operator.
      </p>
    </section>
    <transition name="fade" mode="out-in">
      <!-- These two elements have the same tag name, so they need the 'key' attribute so Vue can tell them apart and transition -->
      <section class="w-5/6 pt-4 mx-auto" key="forms" v-if="!isAuthenticated">
        <Component :is="currentComponent" class="mx-auto"></Component>
        <p class="text-xs pt-4 text-center" v-if="currentComponent === 'Login'">Do you need to <span class="underline cursor-pointer" @click="currentComponent = 'Register'">register</span> first?</p>
        <p class="text-xs pt-4 text-center" v-else>If you are registered, you can just <span class="underline cursor-pointer" @click="currentComponent = 'Login'">login</span>.</p>
      </section>
      <section class="w-5/6 pt-4 mx-auto" key="info" v-else>
        <p class="text-4xl pt-4 text-center">Welcome, {{ name }}.</p>
        <!-- links show based on user permissions and roles -->
        <router-link :to="{ name: 'me' }">
          Check your progress
        </router-link>
        <router-link to="#">
          Manage your shop staff
        </router-link>
      </section>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import { mapGetters } from "vuex"

export default {
  name: "home",
  components: {
    Login,
    Register,
  },
  data() {
    return {
      // showModal: false,
      currentComponent: 'Login'
    }
  },
  computed: {
    ...mapGetters('user', ['name']),
    ...mapGetters('auth', ['isAuthenticated']),
  }
};
</script>

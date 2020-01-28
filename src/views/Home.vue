<template>
  <!-- flex flex-wrap justify-center -->
  <main class="home">
    <section class="mx-auto">
      <h1 class="page-heading">Blue Star Training</h1>
      <p class="pt-4">
        Welcome to the Blue Star training. This training is required for your
        dive/snorkel shop to be recognized as a Blue Star operator.
      </p>
      <svg
        width="400"
        height="400"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Dive flag triangles -->
        <polygon points="50 130 50 300 320 300" stroke="red" fill="red" />
        <polygon points="80 100 350 100 350 270" stroke="red" fill="red" />
        <!-- Dive flag border -->
        <rect
          x="50"
          y="100"
          width="300"
          height="200"
          stroke="lightblue"
          fill="transparent"
          stroke-width="5"
        />
      </svg>
    </section>
    <!-- These two elements have the same tag name, so they need the 'key' attribute so Vue can tell them apart and transition -->
    <transition name="fade" mode="out-in">
      <section
        v-if="!isAuthenticated"
        key="forms"
        class="sm:w-5/6 md:w-3/4 lg:w-1/2 w-full mx-auto px-2"
      >
        <transition name="fade" mode="out-in">
          <Component :is="currentComponent" class="mx-auto"></Component>
        </transition>
        <transition name="fade" mode="out-in">
          <p
            v-if="currentComponent === 'Login'"
            class="text-xs pt-4 text-center"
          >
            Do you need to
            <span
              class="underline cursor-pointer"
              @click="currentComponent = 'Register'"
              >register</span
            >
            first?
          </p>
          <p v-else class="text-xs pt-4 text-center">
            If you are registered, you can just
            <span
              class="underline cursor-pointer"
              @click="currentComponent = 'Login'"
              >login</span
            >.
          </p>
        </transition>
      </section>
      <section
        v-else
        key="info"
        class="sm:w-5/6 md:w-3/4 lg:w-1/2 w-full mx-auto px-2"
      >
        <p class="text-4xl pt-4 text-center">Welcome, {{ name }}.</p>
        <!-- links show based on user permissions and roles -->
        <div class="flex">
          <router-link class="w-1/2" :to="{ name: 'me' }">
            Check your progress for {{ new Date().getFullYear() + 1 }}
          </router-link>
          <router-link class="w-1/2" to="#">
            Manage your shop staff
          </router-link>
        </div>
      </section>
    </transition>
  </main>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    Login,
    Register
  },
  data() {
    return {
      // showModal: false,
      currentComponent: 'Login'
    }
  },
  computed: {
    ...mapGetters('user', ['name']),
    ...mapGetters('auth', ['isAuthenticated'])
  }
}
</script>

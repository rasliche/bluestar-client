<template>
  <div class="login flex flex-wrap justify-center">
    <section class="w-5/6">
      <h1 class="border-blue-lighter border-b-4 mb-4 pt-4">Login</h1>
    </section>
    <section class="w-5/6 pt-4 mx-auto">
      <Component :is="currentComponent" class="mx-auto"></Component>
      <p class="text-xs pt-4 text-center" v-if="currentComponent === 'Login'">Do you need to <span class="underline cursor-pointer" @click="currentComponent = 'Register'">register</span> first?</p>
      <p class="text-xs pt-4 text-center" v-else>If you are registered, you can just <span class="underline cursor-pointer" @click="currentComponent = 'Login'">login</span>.</p>
    </section>
  </div>
</template>

<script>
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
export default {
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
};
</script>

<style></style>

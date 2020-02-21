<template>
  <div class="login flex flex-wrap justify-center">
    <section class="w-5/6">
      <PageHeading>Login</PageHeading>
    </section>
    <section class="w-5/6 pt-4 mx-auto">
      <Component :is="currentComponent" class="mx-auto"></Component>
      <p v-if="currentComponent === 'Login'" class="text-xs pt-4 text-center">
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
    </section>
  </div>
</template>

<script>
import { PageHeading } from '@/components/BaseUI'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
export default {
  components: {
    PageHeading,
    Login,
    Register
  },
  data() {
    return {
      // showModal: false,
      currentComponent: 'Login'
    }
  }
}
</script>

<style></style>

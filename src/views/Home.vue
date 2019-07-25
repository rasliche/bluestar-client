<template>
  <div class="home flex flex-wrap justify-center">
    <section class="w-5/6">
      <h1 class="border-blue-lighter border-b-4 mb-4 pt-4">Blue Star Training</h1>
      <p class="pt-4">
        Welcome to the Blue Star training. This training is required for your
        dive/snorkel shop to be recognized as a Blue Star operator.
      </p>
    </section>
    <section class="w-5/6 pt-4 text-center">
      <Component :is="currentComponent"></Component>
      <p class="text-xs pt-4" v-if="currentComponent === 'Login'">Do you need to <span class="underline cursor-pointer" @click="currentComponent = 'Register'">register</span> first?</p>
      <p class="text-xs pt-4" v-else>If you are registered, you can just <span class="underline cursor-pointer" @click="currentComponent = 'Login'">login</span>.</p>
    </section>
    <button @click="setAlert({ type: 'warn', text: 'info you should know!'})">Make alert</button>
    <button @click="showModal = true">Show Modal</button>
    <Modal 
      :show="showModal" 
      @close="showModal = false"
    >
      <slot name="heading">
        <h1 class="text-center text-2xl text-blue-darkest mb-4">Notice you've just have to see!</h1>
      </slot>
      <slot>
        <p class="text-center text-grey-darkest">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut quasi tempore eveniet ex doloribus, ipsam dolores nulla aut dolore minima delectus illum itaque nihil ab beatae sapiente. Consequatur, quidem omnis.</p>
      </slot>
    </Modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import Modal from '@/components/Modal.vue'
import { createNamespacedHelpers } from 'vuex'

const { mapActions } = createNamespacedHelpers('alert')

export default {
  name: "home",
  components: {
    Login,
    Register,
    Modal,
  },
  data() {
    return {
      showModal: true,
      currentComponent: 'Login'
    }
  },
  methods: {
    ...mapActions(['setAlert'])
  }
};
</script>

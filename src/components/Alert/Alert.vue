<template>
  <!-- <div class="bg-teal-lightest border-t-4 border-teal rounded-b text-teal-darkest px-4 py-3 shadow-md" role="alert">
    <div class="flex">
      <div class="py-1"><svg class="fill-current h-6 w-6 text-teal mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
      <div>
        <p class="font-bold">Our privacy policy has changed</p>
        <p class="text-sm">Make sure you know how these changes affect you.</p>
      </div>
    </div>
  </div> -->
  <div class="fixed pin-r pin-b m-4" role="alert">
    <div
      :class="[
        `flex justify-between
            bg-${alertColor} text-${alertColor}-darkest 
            rounded-sm shadow-md 
            p-2
            opacity-75 hover:opacity-100`
      ]"
    >
      <button
        :class="[
          `cursor-pointer p-2 text-sm
                border border-transparent hover:border-${alertColor}-dark 
                rounded-sm`
        ]"
        @click="clearAlert"
      >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-8 w-8 fill-current"><title>Dismiss</title><path fill-rule="evenodd" d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"></path></svg>
      </button>
      <div class="mr-2">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('alert')
export default {
  name: 'Alert',
  props: {
    type: {
      type: String,
      default: 'warn'
    },
    text: {
      type: String
    }
  },
  methods: {
    ...mapActions(['clearAlert'])
  },
  computed: {
    alertColor: function() {
      if (this.type === 'error') return 'red'
      if (this.type === 'warn') return 'yellow'
      if (this.type === 'success') return 'green'
    }
  }
}
</script>

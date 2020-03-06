<template>
  <div class="fixed right-0 bottom-0 m-4" role="alert">
    <div
      class="flex justify-between rounded-sm shadow-md p-2 opacity-75 transition-opacity ease-in-out duration-300 hover:opacity-100"
      :class="[
        { 'bg-green-200 text-green-900': type === 'success' },
        { 'bg-yellow-200 text-yellow-900': type === 'warn' },
        { 'bg-red-200 text-red-900': type === 'error' }
        ]"
    >
      <button
        class="cursor-pointer m-2 text-sm border border-transparent rounded-sm"
        :class="[
          {'hover:border-green-600': type === 'success'},
          {'hover:border-green-600': type === 'warn'},
          {'hover:border-green-600': type === 'error'}
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
      type: String,
      default: 'Alert!'
    }
  },
  methods: {
    ...mapActions(['clearAlert'])
  }
}
</script>

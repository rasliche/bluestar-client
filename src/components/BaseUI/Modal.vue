<template>
  <portal v-if="show" to="modals">
    <div
      v-show="show"
      class="fixed pin p-8"
      style="background-color: rgba(0, 0, 0, 0.6);"
    >
      <div class="mx-auto mt-8 p-2 rounded-lg bg-white max-w-xl shadow-lg">
        <slot name="heading"></slot>

        <slot name="default"></slot>

        <div v-if="!noCloseButton" class="flex justify-between text-center">
          <slot name="buttons"></slot>
          <button
            class="bg-gray-light px-4 py-2 border-gray border-2 rounded-lg"
            @click="cancel"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: { required: true },
    preventBackgroundScrolling: { default: true },
    noCloseButton: { default: false }
  },
  watch: {
    show: {
      immediate: true,
      handler: function(show) {
        if (show) {
          this.preventBackgroundScrolling &&
            document.body.style.setProperty('overflow', 'hidden')
        } else {
          this.preventBackgroundScrolling &&
            document.body.style.removeProperty('overflow')
        }
      }
    }
  },
  created() {
    const escapeHandler = (e) => {
      if (e.key === 'Escape' && this.show) {
        this.cancel()
      }
    }
    document.addEventListener('keydown', escapeHandler)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', escapeHandler)
    })
  },
  methods: {
    cancel() {
      this.$emit('close')
    }
  }
}
</script>

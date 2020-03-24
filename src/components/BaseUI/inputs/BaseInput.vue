<template>
  <div class="relative mb-6 pb-3">
    <label v-if="label" class="block text-blue-800 font-bold text-sm mb-2">
      {{ label }}
    </label>
    <input 
      :value="value" 
      @input="updateValue" 
      v-bind="$attrs"
      v-on="listeners"
      class="shadow appearance-none rounded border-blue-200 border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
    <slot></slot>
    <!-- <p v-if="errors" class="absolute bottom-0 inset-x-0">
      TODO: How do I show errors here?
    </p> -->
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number]
    },
    // errors: {
    //   type: Array,
    //   default: () => []
    // }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  },
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value)
    },
  }
}
</script>
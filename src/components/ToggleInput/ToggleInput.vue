<template>
  <span
    class="toggle"
    role="checkbox"
    tabindex="0"
    :aria-checked="value.toString()"
    @click="toggle"
    @keydown.space.prevent="toggle"
  ></span>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    toggle() {
      this.$emit('input', !this.value)
    }
  }
}
</script>

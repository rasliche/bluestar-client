<template>
  <button
    type="button"
    class="p-2 rounded mx-auto focus:outline-none focus:shadow-outline"
  >
    <slot>Click Me!</slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton'
}
</script>

<style></style>

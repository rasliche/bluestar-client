<template>
  <button
    v-on="$listeners"
    type="button"
    class="p-2 rounded-lg focus:outline-none focus:shadow-outline"
  >
    <slot>Click Me!</slot>
  </button>
</template>

<script>
export default {
  name: 'ButtonBase',
}
</script>
<template>
  <button
    v-on="$listeners"
    type="button"
    class="p-2 rounded-lg mx-auto focus:outline-none focus:shadow-outline no-underline"
  >
    <slot>Click Me!</slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
}
</script>
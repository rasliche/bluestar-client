<template>
  <div class="prlx">
    <div class="prlx-back bg-green-600 opacity-50 text-center">
      <!-- This scrolls slower -->
      <slot name="back">Background</slot>
    </div>
    <div class="prlx-base bg-green-200 opacity-50 text-center">
      <!-- This scrolls normally -->
      <slot name="base">Base</slot>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Parallax',
}
</script>
<template>
  <ButtonBase 
    v-on="$listeners"
    class="border bg-gray-100 hover:bg-gray-400"
  >
    <slot></slot>
  </ButtonBase>
</template>

<script>
import ButtonBase from '@/components/BaseUI/ButtonBase'

export default {
  name: 'ButtonSecondary',
  components: {
      ButtonBase
  },
}
</script>
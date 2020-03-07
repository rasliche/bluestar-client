<template>
  <ButtonBase 
    v-on="$listeners"
    class="bg-green-500 hover:bg-green-600 text-white"
  >
    <slot></slot>
  </ButtonBase>
</template>

<script>
import ButtonBase from '@/components/BaseUI/buttons/ButtonBase'

export default {
  name: 'ButtonInfo',
  components: {
      ButtonBase
  },
}
</script>
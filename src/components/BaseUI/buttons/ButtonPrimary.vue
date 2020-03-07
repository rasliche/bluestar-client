<template>
  <ButtonBase 
    v-on="$listeners"
    class="bg-blue-500 hover:bg-blue-600 text-white"
  >
    <slot></slot>
  </ButtonBase>
</template>

<script>
import ButtonBase from '@/components/BaseUI/buttons/ButtonBase'

export default {
  name: 'ButtonPrimary',
  components: {
      ButtonBase
  },
}
</script>
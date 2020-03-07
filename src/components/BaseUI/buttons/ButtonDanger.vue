<template>
  <ButtonBase 
    v-on="$listeners"
    class="bg-red-500 hover:bg-red-600 text-white"
  >
    <slot></slot>
  </ButtonBase>
</template>

<script>
import ButtonBase from '@/components/BaseUI/buttons/ButtonBase'

export default {
  name: 'ButtonDanger',
  components: {
      ButtonBase
  },
}
</script>
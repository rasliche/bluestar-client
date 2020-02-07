<template>
  <ButtonBase 
    v-on="$listeners"
    class="bg-red hover:bg-red-dark text-white"
  >
    <slot></slot>
  </ButtonBase>
</template>

<script>
import ButtonBase from '@/components/BaseUI/ButtonBase'

export default {
  name: 'PrimaryButton',
  components: {
      ButtonBase
  },
}
</script>
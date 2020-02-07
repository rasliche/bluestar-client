<template>
  <ButtonBase 
    v-on="$listeners"
    class="bg-blue hover:bg-blue-dark text-white"
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
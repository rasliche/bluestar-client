<template>
  <ButtonBase 
    v-on="$listeners"
    class="bgred-500 hover:bg-red-600 text-white"
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
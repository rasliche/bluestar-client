<template>
  <ButtonBase 
    v-on="$listeners"
    class="border bg-grey-lightest hover:bg-grey-light"
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
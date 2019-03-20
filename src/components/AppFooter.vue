<template>
    <div class="text-center">
      <p class="border-t border-blue-light pt-2 mt-2">Copyright 2018 - FKNMS</p>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('user', {
      user: 'user'
    })
  }
}
</script>

<style>

</style>

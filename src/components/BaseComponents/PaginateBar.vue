<template>
  <Paginate :list="list" :per-page="perPage">
      
  </Paginate>
</template>

<script>
import { Paginate } from '@/components/BaseComponents/'

export default {
    name: 'PaginateBar',
    props: {
      list: {
        type: Array,
        required: true
      },
      perPage: {
        type: Number,
        default: 10,
      }
    },
    components: {
        Paginate
    },

}
</script>

<style>

</style>
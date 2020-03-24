<template>
  <div>
    <PageHeading>Error - 404</PageHeading>
    <p>Page not found</p>
    <router-link :to="{ name: 'home' }">Back to Home</router-link>
  </div>
</template>

<script>
import { PageHeading } from '@/components/BaseUI'

export default {
  name: "NotFound",
  components: {
    PageHeading
  }
}
</script>

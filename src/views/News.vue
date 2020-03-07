<template>
  <main class="news">
    <PageHeading>News</PageHeading>
    <Parallax></Parallax>
  </main>
</template>

<script>
import { PageHeading, Parallax } from '@/components/BaseUI'

export default {
  name: 'News',
  components: {
    PageHeading,
    Parallax
  }
}
</script>
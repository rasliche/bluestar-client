<template>
  <!-- <Parallax class="h-screen text-center"> -->
    <main class="news">
      <BaseToggle v-model="checked" />
      <!-- <ParallaxGroup class="z-10 h-screen bg-green-300">
        <ParallaxLayer class="prlx-base">
          <PageHeading>News</PageHeading>
        </ParallaxLayer>
        <ParallaxLayer class="prlx-back-deep prlx-offset-50 bg-transparent">
          prlx-back-2 prlx-offset-50
        </ParallaxLayer>
        <ParallaxLayer class="prlx-base prlx-offset-50 bg-transparent">
          TOP prlx-base prlx-offset-50
        </ParallaxLayer>
        <ParallaxLayer class="prlx-back prlx-offset-50 bg-transparent">
          prlx-back prlx-offset-50
        </ParallaxLayer>
        <ParallaxLayer class="prlx-back-deeper prlx-offset-50 bg-transparent">
          prlx-back-4 prlx-offset-50
        </ParallaxLayer>
      </ParallaxGroup>

      <ParallaxGroup class="z-20 h-screen prlx-offset-200 bg-red-200">
        <ParallaxLayer class="prlx-back-deepest prlx-offset-100">
          prlx-back-8 prlx-offset-100
        </ParallaxLayer>
        <ParallaxLayer class="prlx-base prlx-offset-100">
          Bottom prlx-base prlx-offset-100
        </ParallaxLayer>
      </ParallaxGroup> -->
    </main>
  <!-- </Parallax> -->
</template>

<script>
import { 
  PageHeading, 
  BaseToggle,
  Parallax, 
  ParallaxGroup, 
  ParallaxLayer 
  } from '@/components/BaseUI'

export default {
  name: 'News',
  components: {
    PageHeading,
    BaseToggle,
    Parallax,
    ParallaxGroup,
    ParallaxLayer,
  },
  data() {
    return {
      checked: false
    }
  }
}
</script>
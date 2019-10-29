<template>
  <div class="pt-4 flex items-center">
    <template v-if="imageSide === 'right'">
      <p
        class="w-1/3 text-right leading-loose border-r-4 pr-4 mr-24"
        :class="captionSize === 'small' ? '' : 'text-4xl'"
      >
        <slot></slot>
      </p>
      <div class="w-2/3">
        <img :src="imageSource" />
      </div>
    </template>

    <template v-else>
      <div class="w-2/3">
        <img :src="imageSource" />
      </div>
      <p
        class="w-1/3 text-left leading-loose border-l-4 pl-4 ml-24"
        :class="captionSize === 'small' ? '' : 'text-4xl'"
      >
        <slot></slot>
      </p>
    </template>
  </div>
</template>

<script>
export default {
  name: "BSlideshow",
  props: ["imageSide", "captionSize", "imageSource"]
};
</script>

<style></style>

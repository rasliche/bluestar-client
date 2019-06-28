<template>
<div>
    <h1>Design Components</h1>
    <section id="BSImage">
        <h2>BSImage</h2>
        <BSImage />
    </section>
    <section id="BSImageWithBigCaption">
        <h2>BSImageWithBigCaption</h2>
        <BSImageWithBigCaption>
            Here is a caption in a slot.
        </BSImageWithBigCaption>
    </section>
</div>
</template>

<script>
import BSImage from '@/components/BSImage.vue'
import BSImageWithBigCaption from '@/components/BSImageWithBigCaption.vue'

export default {
    components: {
        BSImage,
        BSImageWithBigCaption
    }
}
</script>

<style>

</style>

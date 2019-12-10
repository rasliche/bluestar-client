<template>
    <div>    
        Take in an SVG and make it interactive with parts to click.
        For example, a coral that lets you click on mouth, skeleton, zooxanthellae, etc...
    </div>    
</template>

<script>
export default {
    props: {
        svgElement: {
            type: String,
            required: true,
        }
    }
}
</script>

<style>

</style>
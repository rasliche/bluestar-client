<template>
<svg viewbox="0 0 1000 200" xlmns="http://www.w3.org/2000/svg">
    <path id="text-curve" d="M0 100s269.931 86.612 520 0c250.069-86.612 480 0 480 0" fill="none" stroke="#000" />
    <text y="40" font-size="32">
        <textPath href="#text-curve">
            {{ textToScroll }}
        </textPath>
    </text>
</svg>
</template>

<script>
export default {
    name: "TextOnScroll",
    props: {
        textToScroll: {
            type: String,
            required: true,
        },
    },
}
</script>

<style>

</style>
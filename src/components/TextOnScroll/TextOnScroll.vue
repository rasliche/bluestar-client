<template>
<svg viewbox="0 0 1000 200" xlmns="http://www.w3.org/2000/svg">
    <path id="text-curve" :d="curve" fill="none" stroke="#000" />
    <text y="40" font-size="32">
        <textPath href="#text-curve">
            <slot></slot>
        </textPath>
    </text>
</svg>
</template>

<script>
export default {
    name: "TextOnScroll",
    props: {
        curve: {
            type: String, 
            // required: true,
            default: "M0 100s269.931 86.612 520 0c250.069-86.612 480 0 480 0",
        },
    },
    created() {
        // const escapeHandler = e => {
        //     if (e.key === "Escape" && this.show) {
        //         this.dismiss()
        //     }
        // }
        // document.addEventListener("keydown", escapeHandler)
        // function onScroll(){
        //     requestAnimationFrame(function(){
        //         var rect = textContainer.getBoundingClientRect();
        //         var scrollPercent = rect.y / window.innerHeight;
        //         console.log(scrollPercent);
        //         updateTextPathOffset( scrollPercent * 2 * pathLength );
        //     });
        // }

        // this.$once("hook:destroyed", () => {
        //     document.removeEventListener("keydown", escapeHandler)
        // })
    },
}
</script>

<style>

</style>
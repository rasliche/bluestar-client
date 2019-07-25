<template>
<div class="fixed pin p-8" style="background-color: rgba(0, 0, 0, 0.5);" v-show="show">
    <div class="mx-auto mt-8 p-2 rounded-lg bg-white max-w-xl">
        <h1>Notice you've just have to see!</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut quasi tempore eveniet ex doloribus, ipsam dolores nulla aut dolore minima delectus illum itaque nihil ab beatae sapiente. Consequatur, quidem omnis.</p>
        <slot></slot>
        <div class="text-center">
            <button @click="dismiss" class="bg-blue-light px-4 py-2 border-blue border-2 rounded-lg">Close</button>
        </div>
    </div>
</div>
</template>

<script>
export default {
        preventBackgroundScrolling: { default: true }
    },
    methods: {
        dismiss() {
            this.$emit('close')
        }
        show: {
            immediate: true,
            handler: function (show) {
                    if (show) {
                        this.preventBackgroundScrolling && document.body.style.setProperty('overflow', 'hidden')
                    } else {
                        this.preventBackgroundScrolling && document.body.style.removeProperty('overflow')
                    }
                }
            }
    },
    created() {
    }
}
</script>

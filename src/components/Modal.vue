<template>
<portal to="modals" v-if="show">
    <div class="fixed pin p-8" style="background-color: rgba(0, 0, 0, 0.6);" v-show="show">
        <div class="mx-auto mt-8 p-2 rounded-lg bg-white max-w-xl shadow-lg">
            <slot name="heading"></slot>

            <slot name="default"></slot>

            <div class="text-center" v-if="!noCloseButton">
                <slot name="buttons"></slot>
                <button @click="cancel" class="bg-gray-light px-4 py-2 border-gray border-2 rounded-lg">
                    Close
                </button>
            </div>
        </div>
    </div>
</portal>
</template>

<script>
export default {
    props: {
        show: { required: true},
        preventBackgroundScrolling: { default: true },
        noCloseButton: { default: false },
    },
    methods: {
        cancel() {
            this.$emit('close')
        }
    },
    watch: {
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
        const escapeHandler = (e) => {
            if (e.key === 'Escape' && this.show) {
                this.cancel()
            }
        }
        document.addEventListener('keydown', escapeHandler)
        this.$once('hook:destroyed', () => {
            document.removeEventListener('keydown', escapeHandler)
        })
    },
}
</script>

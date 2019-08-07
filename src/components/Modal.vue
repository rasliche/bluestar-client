<template>
<portal to="modals">
    <div class="fixed pin p-8" style="background-color: rgba(0, 0, 0, 0.6);" v-show="show">
        <div class="mx-auto mt-8 p-2 rounded-lg bg-white max-w-xl shadow-lg">
            <slot name="heading"></slot>

            <slot name="default"></slot>

            <div class="text-center" v-if="!noCloseButton">
                <button @click="dismiss" class="bg-blue-light px-4 py-2 border-blue border-2 rounded-lg">Close</button>
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
        dismiss() {
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
                this.dismiss()
            }
        }
        document.addEventListener('keydown', escapeHandler)
        this.$once('hook:destroyed', () => {
            document.removeEventListener('keydown', escapeHandler)
        })
    },
}
</script>

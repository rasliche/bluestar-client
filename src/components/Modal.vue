<template>
<div class="fixed pin p-8" style="background-color: rgba(0, 0, 0, 0.6);" v-show="show">
    <div class="mx-auto mt-8 p-2 rounded-lg bg-white max-w-xl shadow-lg">
        <slot name="heading">
            <h1 class="text-center text-2xl text-blue-darkest mb-4">Notice you've just have to see!</h1>
        </slot>

        <slot name="default">
            <p class="text-center text-grey-darkest">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut quasi tempore eveniet ex doloribus, ipsam dolores nulla aut dolore minima delectus illum itaque nihil ab beatae sapiente. Consequatur, quidem omnis.</p>
        </slot>
        
        <div class="text-center">
            <button @click="dismiss" class="bg-blue-light px-4 py-2 border-blue border-2 rounded-lg">Close</button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        show: { required: true},
        preventBackgroundScrolling: { default: true }
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

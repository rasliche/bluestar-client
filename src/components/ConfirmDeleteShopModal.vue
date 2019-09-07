<template>
<Modal :show="show" @close="cancel">
    <template v-slot:heading>Delete Shop?</template>
    <template v-slot:buttons>
        <button @click="deleteOperator" class="bg-red-light px-4 py-2 border-red border-2 rounded-lg mr-2">
            Delete {{ operator.name }}
        </button>
    </template>
</Modal>
</template>

<script>
import Modal from '@/components/Modal.vue'
import Api from '@/services/Api.js'

export default {
    components: {
        Modal,
    },
    props: ['show', 'operator'],
    methods: {
        cancel() {
            this.$emit('close')
        },
        async deleteOperator() {
            await Api.delete(`/operators/${this.operator._id}`)
            console.log("Baleted.")
            this.cancel()
        }
    }
}
</script>

<style>

</style>
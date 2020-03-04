<template>
  <Modal :show="show" @close="cancel">
    <template v-slot:heading
      >Delete Shop?</template
    >
    <template v-slot:buttons>
      <button
        class="bg-red-400 px-4 py-2 borderred-500 border-2 rounded-lg mr-2"
        @click="deleteOperator"
      >
        Delete {{ operator.name }}
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/BaseUI/Modal.vue'
import Api from '@/services/Api.js'
import { mapGetters } from 'vuex'

export default {
  components: {
    Modal
  },
  props: ['show', 'operator'],
  computed: {
    ...mapGetters('auth', ['token'])
  },
  methods: {
    cancel() {
      this.$emit('close')
    },
    async deleteOperator() {
      await Api.delete(`/operators/${this.operator._id}`, {
        headers: {
          Authorization: `Bearer: ${this.token}`
        }
      })
      console.log('Baleted.')
      this.cancel()
    }
  }
}
</script>

<style></style>

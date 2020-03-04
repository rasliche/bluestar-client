<template>
  <Modal :show="show" :prevent-background-scrolling="false" @close="cancel">
    <template v-slot:heading>
      <h1 class="text-center pb-3">Create Program</h1>
    </template>
    <template v-slot:default>
      <form @submit.prevent="submitProgram" class="px-8 pt-6 pb-8 mb-4">
        <section class="relative mb-6 pb-3">
          <label
            for="fname"
            class="block text-blue-800 font-bold text-sm mb-2"
            >Program Name</label
          >
          <input
            id="fname"
            v-model.lazy="$v.formResponses.name.$model"
            type="text"
            name="fname"
            class="shadow appearance-none rounded border-blue-200 border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p v-if="errors" class="absolute bottom-0 inset-x-0 text-center">
            <span
              v-if="!$v.formResponses.name.required"
              class="text-red-500 text-sm"
              >This field is required</span
            >
          </p>
        </section>
      </form>
    </template>
    <template v-slot:buttons>
      <ButtonPrimary @click.prevent="submitProgram">
        Create
      </ButtonPrimary>
    </template>
  </Modal>
</template>

<script>
import Api from '@/services/Api'
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import Modal from '@/components/BaseUI/Modal.vue'
import ButtonPrimary from '@/components/BaseUI/ButtonPrimary'

export default {
  name: 'CreateProgramModal',
  components: {
    Modal,
    ButtonPrimary
  },
  props: ['show'],
  data() {
    return {
      formResponses: {
        name: null,
      },
      formTouched: true,
      errors: false
    }
  },
  validations: {
    formResponses: {
      name: {
        required
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['token'])
  },
  methods: {
    ...mapActions('alert', ['setAlert']),
    cancel() {
      this.$emit('close')
    },
    async submitProgram() {
      this.formTouched = !this.$v.formResponses.$anyDirty
      this.errors = this.$v.formResponses.$anyError
      if (this.errors === false && this.formTouched === false) {
        const programData = {
          name: this.formResponses.name,
        }
        try {
          const { data } = await Api.post('/programs', programData, {
            // headers: {
            //   Authorization: `Bearer: ${this.token}`
            // }
          })
          this.setAlert({
            type: 'success',
            text: `Created new program: ${data.name}`
          })
          this.$emit('program-created', data)
          this.$emit('close')
        } catch (error) {
          console.log(error)
          this.cancel()
        }
      }
    }
  }
}
</script>

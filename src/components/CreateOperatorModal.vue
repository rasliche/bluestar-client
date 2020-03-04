<template>
  <Modal :show="show" :prevent-background-scrolling="false" @close="cancel">
    <template v-slot:heading>
      <h1 class="">Create Operator</h1>
    </template>
    <template v-slot:default>
      <form class="px-8 pt-6 pb-8 mb-4">
        <section class="relative mb-6 pb-3">
          <label
            for="fname"
            class="block text-blue-800 font-bold text-sm mb-2"
            >Name</label
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
        <section class="relative mb-6 pb-3">
          <label 
            for="fpassword" 
            class="block text-blue-800 font-bold text-sm mb-2"
            >Password</label
          >
          <input
            id="fpassword"
            v-model.lazy="$v.formResponses.password.$model"
            type="text"
            name="fpassword"
            class="shadow appearance-none rounded border-blue-200 border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p v-if="errors" class="absolute bottom-0 inset-x-0 text-center">
            <span
              v-if="!$v.formResponses.password.required"
              class="text-red-500 text-sm"
              >This field is required</span
            >
          </p>
        </section>
        <section class="relative px-4 pb-8 flex">
          <div v-for="program in programOptions" :key="program._id">
            <label
              class="block capitalize text-blue-800 font-bold text-sm mb-2"
            >
              <input
                :id="program.name"
                v-model="formResponses.programs"
                type="checkbox"
                :value="program._id"
              />
              {{ program.name }}
            </label>
          </div>
        </section>
      </form>
    </template>
    <template v-slot:buttons>
      <ButtonPrimary @click.prevent="submitOperator">
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
  name: 'CreateOperatorModal',
  components: {
    Modal,
    ButtonPrimary
  },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      formResponses: {
        name: null,
        password: null,
        programs: []
      },
      programOptions: [],
      formTouched: true,
      errors: false
    }
  },
  validations: {
    formResponses: {
      name: {
        required
      },
      password: {
        required
      }
    }
  },
  async mounted() {
    const { data } = await Api.get('/programs')
    this.programOptions = data
  },
  computed: {
    ...mapGetters('auth', ['token'])
  },
  methods: {
    ...mapActions('alert', ['setAlert']),
    ...mapActions('operator', ['postOperator']),
    cancel() {
      this.$emit('close')
    },
    async submitOperator() {
      this.formTouched = !this.$v.formResponses.$anyDirty
      this.errors = this.$v.formResponses.$anyError
      if (this.errors === false && this.formTouched === false) {
        const shopData = {
          name: this.formResponses.name,
          password: this.formResponses.password,
          programs: this.formResponses.programs
        }
        try {
          await this.postOperator(shopData)
          this.cancel()
        } catch (error) {
          console.log(error)
          this.cancel()
        }
      }
    }
  }
}
</script>

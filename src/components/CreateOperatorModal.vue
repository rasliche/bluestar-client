<template>
  <Modal :show="show" :prevent-background-scrolling="false" @close="cancel">
    <template v-slot:heading>
      <h1 class="text-center pb-3">Create Operator</h1>
    </template>
    <template v-slot:default>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <section class="relative mb-6 pb-3">
          <label
            for="fname"
            class="block text-blue-darker font-bold text-sm mb-2"
            >Name</label
          >
          <input
            id="fname"
            v-model.lazy="$v.formResponses.name.$model"
            type="text"
            name="fname"
            class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p v-if="errors" class="absolute pin-b pin-x text-center">
            <span
              v-if="!$v.formResponses.name.required"
              class="text-red text-sm"
              >this field is required</span
            >
          </p>
        </section>
        <section class="relative px-4 pb-8 flex">
          <label for="fpassword" class="text-blue-darker w-1/3 text-right pr-4"
            >Password</label
          >
          <input
            id="fpassword"
            v-model.lazy="$v.formResponses.password.$model"
            type="text"
            name="fpassword"
            class="border-blue-lighter border-b-2 pl-2 w-2/3"
          />
          <p v-if="errors" class="absolute pin-b pin-x text-center">
            <span
              v-if="!$v.formResponses.password.required"
              class="text-red text-sm"
              >this field is required</span
            >
          </p>
        </section>
        <section class="relative px-4 pb-8 flex">
          <div v-for="program in programOptions" :key="program._id">
            <label
              class="block capitalize text-blue-darker font-bold text-sm mb-2"
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
      <button
        class="border-2 p-1 rounded border-blue mx-auto"
        @click.prevent="submitOperator"
      >
        Create
      </button>
    </template>
  </Modal>
</template>

<script>
import Api from '@/services/Api'
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import Modal from '@/components/Modal.vue'

export default {
  name: 'CreateOperatorModal',
  components: {
    Modal
  },
  props: ['show'],
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

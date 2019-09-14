<template>
  <Modal :show="show" @close="cancel">
    <template v-slot:heading>
      <h1 class="text-center pb-8">Create Operator</h1>
    </template>
    <template v-slot:default>
      <form>
        <section class="relative px-4 pb-8 flex">
          <label 
            for="fname"
            class="text-blue-darker w-1/3 text-right pr-4"
          >Name</label>
          <input 
            type="text"
            name="fname" 
            id="fname" 
            v-model.lazy="$v.formResponses.name.$model"
            class="border-blue-lighter border-b-2 pl-2 w-2/3"
          />
          <p v-if="errors" class="absolute pin-b pin-x text-center">
            <span class="text-red text-sm" v-if="!$v.formResponses.name.required">this field is required</span>
          </p>
        </section>
        <section class="relative px-4 pb-8 flex">
          <label 
            for="fpassword"
            class="text-blue-darker w-1/3 text-right pr-4"
          >Password</label>
          <input 
            type="text" 
            id="fpassword" 
            name="fpassword"
            v-model.lazy="$v.formResponses.password.$model" 
            class="border-blue-lighter border-b-2 pl-2 w-2/3"
          />
          <p v-if="errors" class="absolute pin-b pin-x text-center">
            <span class="text-red text-sm" v-if="!$v.formResponses.password.required">this field is required</span>
          </p>
        </section>
        <section class="relative px-4 pb-8 flex">
          <label 
            for="programs"
            class="text-blue-darker w-1/3 text-right pr-4"
          >Programs</label>
          <input
            type="checkbox"
            value="diving"
            id="diving"
            v-model="formResponses.programs"
          />Diving
          <input
            type="checkbox"
            value="fishing"
            id="fishing"
            v-model="formResponses.programs"
          />Fishing
        </section>
      </form>
    </template>
    <template v-slot:buttons>
      <button 
        @click.prevent="submitOperator"
        class="border-2 p-1 rounded border-blue mx-auto"
        >Create
      </button>
    </template>
  </Modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import Modal from "@/components/Modal.vue"

export default {
  name: "CreateOperatorModal",
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
      formTouched: true,
      errors: false
    }
  },
  validations: {
    formResponses: {
      name: {
        required,
      },
      password: {
        required,
      }
    }
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
        };
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
};
</script>
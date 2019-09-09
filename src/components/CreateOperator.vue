<template>
    <div class="border-2 rounded w-1/2">
        <h1 class="text-center pb-8">Create Operator</h1>
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

    <section class="relative px-4 pb-6 flex">
      <button 
        @click.prevent="submitOperator"
        class="border-2 p-1 rounded border-blue mx-auto"
        >Create
      </button>
    </section>
  </form>
  </div>
</template>

<script>
import Api from "@/services/Api";
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "CreateOperator",
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
          const { data } = await Api.post("/operators", 
              shopData,
              {
                headers: {
                  Authorization: `Bearer: ${this.token}`
                }
              });
          this.$emit('operatorCreated')
          this.setAlert({ 
            type: 'success', 
            text: `${data.name} was created.`
          })
        } catch (error) {
          console.log(error.response)
        }
      }
    }
  }
};
</script>
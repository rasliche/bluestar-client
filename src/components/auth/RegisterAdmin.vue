<template>
<div class="w-full max-w-xs">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="POST">
    <h1 class="text-center pb-3">Register</h1>
    <section class="relative mb-6 pb-3">
      <label 
        for="fname" 
        class="block text-blue-darker font-bold text-sm mb-2"
        >Name</label>
      <input 
        type="text" 
        name="fname" 
        id="fname" 
        v-model="$v.formResponses.name.$model"
        autocomplete="section-register name"
        class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      <p v-if="errors" class="absolute pin-b pin-x">
        <span class="error" v-if="!$v.formResponses.name.required">This field is required.</span>
      </p>
    </section>

    <section class="relative mb-6 pb-3">
      <label 
        for="femail" 
        class="block text-blue-darker font-bold text-sm mb-2"
        >Email</label>
      <input 
        type="text" 
        name="femail" 
        id="femail" 
        v-model="$v.formResponses.email.$model" 
        autocomplete="section-register email"
        class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
      />
      <p v-if="errors" class="absolute pin-b pin-x">
        <span class="error" v-if="!$v.formResponses.email.required">This field is required. </span>
        <span class="error" v-if="!$v.formResponses.email.minLength">Field must have at least {{ $v.formResponses.email.$params.minLength.min }} characters.</span>
      </p>
    </section>

    <section class="relative mb-6 pb-3">
      <label 
        for="fpassword1" 
        class="block text-blue-darker font-bold text-sm mb-2"
        >Password</label>
      <input 
        type="password" 
        name="fpassword1" 
        id="fpassword1" 
        v-model="$v.formResponses.password1.$model"
        autocomplete="section-register new-password" 
        class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
      />
      <p v-if="errors" class="absolute pin-b pin-x">
        <span class="error" v-if="!$v.formResponses.password1.required">This field is required. </span>
        <span class="error" v-if="!$v.formResponses.password1.minLength">Field must have at least {{ $v.formResponses.password1.$params.minLength.min }} characters.</span>
      </p>
    </section>

    <section class="relative mb-6 pb-3">
      <label 
        for="fpassword2" 
        class="block text-blue-darker font-bold text-sm mb-2"
        >Re-type Password</label>
      <input 
        type="password" 
        name="fpassword2" 
        id="fpassword2" 
        v-model="$v.formResponses.password2.$model" 
        autocomplete="section-register new-password"
        class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
      />
      <p v-if="errors" class="absolute pin-b pin-x">
        <span class="error" v-if="!$v.formResponses.password2.required">This field is required. </span>
        <span class="error" v-if="!$v.formResponses.password2.sameAsPassword">Passwords must match.</span>
      </p>
    </section>

    <section class="relative mb-6 pb-3">
      <label 
        for="fadminPass" 
        class="block text-blue-darker font-bold text-sm mb-2"
        >Admin Password</label>
      <input 
        type="password" 
        name="fadminPass" 
        id="fadminPass" 
        v-model="$v.formResponses.adminPass.$model"
        class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
      />
      <p v-if="errors" class="absolute pin-b pin-x">
        <span class="error" v-if="!$v.formResponses.adminPass.required">This field is required.</span>
      </p>
    </section>

    <section class="flex items-center justify-between">
      <button
        type="button"
        @click.prevent="submitRegisterForm" 
        class="p-2 rounded mx-auto bg-blue hover:bg-blue-dark text-white focus:outline-none focus:shadow-outline"
        :disabled="uiState === 'form submitted'">
        Register
      </button>
      <!-- <a href="#" class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker">Forgot password?</a> -->
    </section>
  </form>
  <!-- TODO: Style this feedback -->
  {{ formFeedback }}
  {{ uiState }}
</div>
</template>

<script>
import Api from '../../services/Api'
import { mapActions } from 'vuex'
import { 
    required,
    minLength,
    maxLength,
    sameAs
    } from 'vuelidate/lib/validators'

export default {
    name: "RegisterAdmin",
    data() {
      return {
        formFeedback: null,
        uiState: 'submit not clicked',
        errors: false,
        formTouched: true,
        formResponses: {
          name: null,
          email: null,
          password1: null,
          password2: null,
          adminPass: null,
        }
      }
    },
    validations: {
        formResponses: {
            name: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(255),
            },
            email: {
                required,
                minLength: minLength(5),
                maxLength: maxLength(255)
            },
            password1: {
                required,
                minLength: minLength(6),
            },
            password2: {
                required,
                sameAsPassword: sameAs("password1")
            },
            adminPass: {
              required,
            }
        }
    },
    methods: {
      ...mapActions('alert', ['setAlert']),
      ...mapActions('user', ['setCurrentUser']),
      ...mapActions('auth', ['authUser']),
      async submitRegisterForm() {
        this.formTouched = !this.$v.formResponses.$anyDirty
        this.errors = this.$v.formResponses.$anyError
        this.uiState = 'submit clicked'
        if (this.errors === false && this.formTouched === false) {
          const formData = {
            name: this.formResponses.name,
            email: this.formResponses.email,
            password: this.formResponses.password1,
            adminPass: this.formResponses.adminPass
          }
          this.uiState = 'form submitted'
          try {
            const { data: { token, _v, ...userData } } = await Api.post("/users/register-as-admin", formData);
            this.setCurrentUser(userData)
            this.authUser(token)
            this.setAlert({ 
              type: 'success', 
              text: 'You have been logged in.'
            })
            // console.log("send form data to register here")
            // console.log(formData)
          } catch (error) {
            console.log(error.response)
            if (error.response.status === 400) {
              this.uiState = 'submit not clicked'
              this.formFeedback = error.response.data
            }
            console.log(error)
          }
        }
        // this.$store.dispatch('register', formData)
      }
    }
  }
</script>

<style lang="postcss" scoped>
.error {
  @apply text-red text-sm italic;
}
</style>
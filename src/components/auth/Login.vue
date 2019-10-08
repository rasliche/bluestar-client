<template>
  <div class="w-full max-w-xs">
    <!-- <h1 class="text-center pb-8">Login</h1> -->
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="relative mb-6 pb-3">
        <label 
          for="femail" 
          class="block text-blue-darker font-bold text-sm mb-2"
        >Email</label>
        <input 
          type="text" 
          name="femail" 
          id="femail" 
          v-model="$v.formResponses.email.$model" 
          autocomplete="section-login email" 
          class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="errors" class="absolute pin-b pin-x">
          <span class="error" v-if="!$v.formResponses.email.required">This field is required.</span>
        </p>
      </div>

      <div class="relative mb-6 pb-3">
        <label for="fpassword" class="block text-blue-darker font-bold text-sm mb-2">Password</label>
        <input
          type="password"
          name="fpassword"
          id="fpassword"
          v-model="$v.formResponses.password.$model"
          autocomplete="section-login current-password"
          class="shadow appearance-none rounded border-blue-lighter border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="errors" class="absolute pin-b pin-x">
          <span class="error" v-if="!$v.formResponses.password.required">This field is required.</span>
        </p>
      </div>

      <div class="flex items-center justify-between">
        <button
          type="button"
          @click.prevent="submitLoginForm" 
          class="p-2 rounded mx-auto bg-blue hover:bg-blue-dark text-white focus:outline-none focus:shadow-outline"
          :disabled="uiState === 'formSubmitted'"
          >Login
        </button>
        <a href="#" class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker">Forgot password?</a>
      </div>
    </form>
    <!-- TODO: Style this feedback -->
    <!-- {{ formFeedback }} -->
  </div>
</template>

<script>
import { required, } from 'vuelidate/lib/validators'
import Api from '@/services/Api'
import { mapActions } from 'vuex'

export default {
  components: {
    // Alert
  },
  data() {
    return {
      formFeedback: null,
      uiState: 'submit not clicked',
      errors: false,
      formTouched: true,
      formResponses: {
        email: null,
        password: null
      }
    };
  },
  validations: {
      formResponses: {
          email: {
              required,
          },
          password: {
              required,
          }
      }
  },
  methods: {
    ...mapActions('alert', ['setAlert']),
    ...mapActions('user', ['setCurrentUser']),
    ...mapActions('auth', ['authUser']),
    async submitLoginForm() {
      this.formTouched = !this.$v.formResponses.$anyDirty
      this.errors = this.$v.formResponses.$anyError
      this.uiState = 'submit clicked'
      if (this.errors === false && this.formTouched === false) {
        const authData = {
          email: this.formResponses.email,
          password: this.formResponses.password
        };
        this.uiState = 'form submitted'
        try {
          const { data } = await Api.post("/auth/login", authData);
          this.setCurrentUser(data.user)
          this.authUser(data.token)
          this.setAlert({ 
            type: 'success', 
            text: 'You have been logged in.'
          })
        } catch (error) {
          const { message } = error.response.data
          console.log(error.response)
          this.formFeedback = message
        }
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.error {
  @apply text-red text-sm italic;
}
</style>
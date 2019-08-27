<template>
  <div class="border-2 rounded w-1/2">
    <h1 class="text-center">Login</h1>
    <form>
      <section class="relative px-4 pb-6 flex">
        <label 
          for="femail" 
          class="text-blue-darker w-1/3 text-right pr-4"
        >Email</label>
        <input 
          type="text" 
          name="femail" 
          id="femail" 
          v-model.lazy="$v.formResponses.email.$model" 
          autocomplete="section-login email" 
          class="border-blue-lighter border-b-2 pl-2 w-2/3"
        />
        <p v-if="errors" class="absolute pin-b pin-x text-center">
          <span class="text-red text-sm" v-if="!$v.formResponses.email.required">this field is required</span>
        </p>
      </section>

      <section class="relative px-4 pb-6 flex">
        <label for="fpassword" class="text-blue-darker w-1/3 text-right pr-4">Password</label>
        <input
          type="password"
          name="fpassword"
          id="fpassword"
          v-model.lazy="$v.formResponses.password.$model"
          autocomplete="section-login current-password"
          class="border-blue-lighter border-b-2 pl-2 w-2/3"
        />
        <p v-if="errors" class="absolute pin-b pin-x text-center">
          <span class="text-red text-sm" v-if="!$v.formResponses.password.required">this field is required</span>
        </p>
      </section>

      <section class="relative px-4 pb-6 flex">
        <button @click.prevent="submitLoginForm" class="border-2 p-1 rounded border-blue mx-auto">
          Login
        </button>
      </section>
    </form>
    <!-- TODO: Style this feedback -->
    {{ formFeedback }}
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
          const response = await Api.post("/auth/login", authData);
          console.log(response)
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

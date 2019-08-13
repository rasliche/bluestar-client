<template>
  <div class="border-2 rounded w-1/2">
    <h1 class="">Login</h1>
    <form>
      <div class="m-2">
        <label for="femail" class="text-blue-darker pr-2">Email</label>
        <input
          type="text"
          name="femail"
          id="femail"
          v-model.lazy="$v.formResponses.email.$model"
          autocomplete="section-login email"
          class="border-blue-lighter border-b-2 pl-2"
        />
        <p>
          <span class="text-red text-sm" v-if="!$v.formResponses.email.required">this field is required</span>
        </p>
      </div>
      <div>
        <label for="fpassword" class="text-blue-darker pr-2">Password</label>
        <input
          type="password"
          name="fpassword"
          id="fpassword"
          v-model.lazy="$v.formResponses.password.$model"
          autocomplete="section-login current-password"
          class="border-blue-lighter border-b-2 pl-2"
        />
        <p>
          <span class="text-red text-sm" v-if="!$v.formResponses.password.required">this field is required</span>
        </p>
      </div>
      <div>
        <!-- <p v-if="formFeedback">{{ formFeedback }}</p> -->
      </div>
      <button @click.prevent="submitLoginForm" class="border-2 m-2 p-2 rounded border-blue mx-auto">
        Login
        <!-- <Alert 
          v-if="loginSuccess"
          type="success" 
          text="Successfully logged in!">
        </Alert> -->
      </button>
    </form>
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
        } catch (err) {
          console.warn(err)

        }
      }
    }
  }
};
</script>

<template>
  <div class="border-2 rounded w-1/2 mx-auto text-center">
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
    async submitLoginForm() {
      const authData = {
        email: this.formResponses.email,
        password: this.formResponses.password
      };
      try {
        const response = await Api.post("/auth/login", authData);
        // const { data, message } = await Api.post("/auth/login", authData);
        // if (message) { this.formFeedback = message}
        console.log(response)
      } catch (err) {
        console.log(err)
      }
      // this.$store.dispatch("login", authData);
    }
  }
};
</script>
